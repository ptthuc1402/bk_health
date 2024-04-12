module.exports = (app) => {
  const patient = require("../controllers/patient.controller.js");
  const router = require("express").Router();
  router.get("/index", patient.index);
  router.post("/search", patient.search);
  router.get("/index_name", patient.indexName);
  router.post("/get_patient", patient.getPatient);
  app.use("/patient", router);
};
