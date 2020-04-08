import React from "react";
const DataExtraction = React.lazy(() =>
  import("./views/DataExtraction/DataExtraction")
);

const ImageMapEditor = React.lazy(() =>
  import("./views/EditorLib/components/imagemap/ImageMapEditor")
);

const routes = [
  {
    path: "/extraction",
    exact: true,
    name: "Data Extraction",
    component: DataExtraction
  },
  {
    path: "/editor",
    exact: true,
    name: "editor",
    component: ImageMapEditor
  }
];

export default routes;
