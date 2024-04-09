const Patient = require("../models/patient.model.js"); // create new patient
exports.index = async function (req, res) {
  //title
  const patients = await Patient.find({});
  res.status(200).json({ patients });
};

exports.search = async function (req, res) {
  //title
  const { data } = req.body;
  const patients = await Patient.find({ name: data });
  if (patients !== null) {
    res.status(200).json({ patients });
  }
};

exports.indexName = async function (req, res) {
  //title
  const patients = await Patient.find({});
  const patient_name = [];
  const patient_id = [];
  const data = [];

  for (var i = 0; i < patients.length; i++) {
    if (patients[i].img_url) {
      patient_name[i] = patients[i].name;
      patient_id[i] = patients[i].patient_id;
      data[i] = patient_name[i] + "_" + patient_id[i];
    }
  }
  res.status(200).json({ data });
};
