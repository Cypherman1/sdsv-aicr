const mongoose = require("mongoose");

const Templates = mongoose.model("Templates");
const ImgsTemplate = mongoose.model("ImgsTemplate");

let found = false;
let tmp;

function recursiveFind(templates, nodeId) {
  templates.map(template => {
    if (!found && template.nodeId == nodeId) {
      found = true;
      tmp = template;
    } else if (!found && template.children) {
      recursiveFind(template.children, nodeId);
    }
  });
}

function getRoot(template) {
  if (template.level == 1) return template;
  else {
    return getRoot(template.parent());
  }
}

module.exports = app => {
  app.post("/api/template/remove", async (req, res) => {
    found = false;
    tmp = null;
    try {
      const templates = await Templates.find({});
      await recursiveFind(templates, req.body._id, found);
      if (tmp) {
        if (tmp.level == 1) {
          const result = await Templates.deleteOne({ _id: req.body._id });
          res.status(200).json(result);
        } else {
          tmp.remove();
          const doc = await getRoot(tmp).save();
          res.status(200).json(doc);
        }
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.post("/api/template/istemplate", async (req, res) => {
    found = false;
    tmp = null;
    try {
      const templates = await Templates.find({});
      await recursiveFind(templates, req.body._id, found);
      if (tmp) {
        res.status(200).json({
          isTemplate: tmp.isLeaf,
          label: tmp.label,
          templateId: tmp.templateId
        });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.post("/api/template/add_img", async (req, res) => {
    const _id = new mongoose.Types.ObjectId();
    const ImgTemplate = new ImgsTemplate({
      _id: _id,
      imgId: req.body.imgId,
      templateId: req.body.templateId
    });
    try {
      const result = await ImgTemplate.save();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.post("/api/template/del_img", async (req, res) => {
    try {
      const result = await ImgsTemplate.deleteMany({
        imgId: req.body.imgId
      });
      res.status(200).json(result);
    } catch (err) {
      console.log("err" + err);
      res.status(500).json({ error: err });
    }
  });

  app.post("/api/template/get_imgs", async (req, res) => {
    try {
      const imgs = await ImgsTemplate.find({ templateId: req.body.templateId });
      res.status(200).json(imgs);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.post("/api/template/add", async (req, res) => {
    const _id = new mongoose.Types.ObjectId();
    const Template = new Templates({
      _id: _id,
      nodeId: _id,
      label: req.body.label,
      isLeaf: req.body.isLeaf,
      templateId: req.body.templateId,
      level: 1,
      children: []
    });
    try {
      const result = await Template.save();
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.post("/api/template/addbykey", async (req, res) => {
    try {
      const doc = await Templates.findById(req.body.id);
      res.status(200).json(doc);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });

  app.post("/api/template/addtokey", async (req, res) => {
    const _id = new mongoose.Types.ObjectId();
    found = false;
    tmp = null;
    try {
      const templates = await Templates.find({});
      await recursiveFind(templates, req.body.parentId, found);

      if (tmp) {
        const child = new Templates({
          _id: _id,
          nodeId: _id,
          level: tmp.level + 1,
          label: req.body.label,
          isLeaf: req.body.isLeaf,
          templateId: req.body.templateId,
          children: []
        });
        tmp.children.push(child);
        const doc = await getRoot(tmp).save();
        res.status(200).json({ tree: doc, id: _id });
      }
    } catch (err) {
      console.log("fail");
      res.status(500).json({ error: err });
    }
  });

  app.get("/api/template/all", async (req, res) => {
    try {
      const docs = await Templates.find();
      res.status(200).json(docs);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  });
};
