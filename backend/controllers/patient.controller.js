const Patient = require("../models/patient.model.js");

// create new patient
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

exports.getQuantityFingerID = async function (req, res) {
  //title
  var count_fingerID = 0;
  const patients = await Patient.find({});
  for (var i = 0; i < patients.length; i++) {
    if (patients[i].idFinger) {
      count_fingerID++;
    }
  }

  res.status(200).json({ count_fingerID });
};

exports.updatePatientId = async function (req, res) {
  //title

  const { patient_id, finger_id } = req.body;
  // const search = await Patient.find({
  //   patient_id: request.patient_id.toString(),
  // });
  // console.log(search);

  const patients = await Patient.findOneAndUpdate(
    {
      patient_id: patient_id,
    },
    { idFinger: finger_id }
  );
  console.log(patients);
  // res.status(200).json({ count_fingerID });
};

exports.findPatientFinger = async function (req, res) {
  //title

  const { patient_id, count_fingerID_post } = req.body;
  // const search = await Patient.find({
  //   patient_id: request.patient_id.toString(),
  // });
  // console.log(search);

  const patients = await Patient.findOneAndUpdate(
    {
      patient_id: patient_id,
    },
    { idFinger: count_fingerID_post }
  );
  console.log(patients);
  // res.status(200).json({ count_fingerID });
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

exports.getPatient = async function (req, res) {
  //title
  var patient_id_get;
  var id_detected;
  if (req.body.id_detected) {
    id_detected = req.body.id_detected;
  }

  if (req.body.patient_id) {
    patient_id_get = req.body.patient_id.slice(1, 4);
  }
  var patient;
  console.log(patient_id_get);
  console.log(id_detected);
  if (id_detected) {
    patient = await Patient.find({ idFinger: id_detected });
  } else {
    patient = await Patient.find({ patient_id: patient_id_get });
  }

  console.log(patient);
  res.status(200).json({ patient });
};
