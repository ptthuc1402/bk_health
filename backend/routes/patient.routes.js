module.exports = (app) => {
  const patient = require("../controllers/patient.controller.js");
  const router = require("express").Router();
  router.get("/index", patient.index);
  router.post("/search", patient.search);
  router.get("/index_name", patient.indexName);
  router.post("/get_patient", patient.getPatient);
  router.get("/get_quantity_fingerid", patient.getQuantityFingerID);
  router.post("/update_patient_id", patient.updatePatientId);
  router.post("/find_patient_finger", patient.findPatientFinger);
  app.use("/patient", router);
};
