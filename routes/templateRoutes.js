const mongoose = require("mongoose");

const Templates = mongoose.model("Templates");

let found = false;
let tmp;

module.exports = app => {
  app.post("/api/template/remove", async (req, res) => {
    const result = await Templates.deleteOne({ _id: req.body._id });
    res.status(200).json(result);
  });

  app.post("/api/template/add", (req, res) => {
    const _id = new mongoose.Types.ObjectId();
    const Template = new Templates({
      _id: _id,
      key: _id,
      title: req.body.title,
      isLeaf: req.body.isLeaf,
      level: 1,
      children: []
    });

    Template.save()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post("/api/template/addbykey/", (req, res) => {
    Templates.findById(req.body.key)
      .exec()
      .then(doc => res.status(200).json(doc))
      .catch(err => console.log(err));
  });

  function recursiveFind(templates, key) {
    templates.map(template => {
      if (!found && template.key == key) {
        found = true;
        tmp = template;
      } else if (!found && template.children) {
        recursiveFind(template.children, key);
      }
    });
  }

  function getRoot(template) {
    if (template.level == 1) return template;
    else {
      return getRoot(template.parent());
    }
  }

  app.post("/api/template/addtokey/", async (req, res) => {
    const _id = new mongoose.Types.ObjectId();
    //const parrent = await Templates.children.id(req.body.parrentkey);
    found = false;
    tmp = null;
    Templates.find({}, async (err, templates) => {
      if (err) {
      } else {
        //console.log(`key = ${req.body.parrentkey}`);
        await recursiveFind(templates, req.body.parrentkey, found);

        if (tmp) {
          const child = new Templates({
            _id: _id,
            key: _id,
            level: tmp.level + 1,
            title: req.body.title,
            isLeaf: req.body.isLeaf,
            children: []
          });
          tmp.children.push(child);
          //console.log(getRoot(tmp));
          //const a = tmp.parent();
          // if (a.parent()) {
          //   console.log("abc");
          // } else {
          //   console.log("bac");
          // }
          const doc = await getRoot(tmp).save();
          res.status(200).json(doc);
        }
      }
    });
  });

  app.get("/api/template/all", (req, res) => {
    Templates.find()
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {});
  });
};
