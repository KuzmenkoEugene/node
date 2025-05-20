const Student = require("../models/student.model");

const addStudents = async () => {
  await Student.insertMany([
    { name: "Ivan", age: 21, group: "A", marks: [75, 90, 82] },
    { name: "Maria", age: 22, group: "B", marks: [88, 92, 85] },
    { name: "Oleg", age: 20, group: "A", marks: [60, 70, 80] },
    { name: "Anna", age: 23, group: "C", marks: [95, 97, 99] },
    { name: "Andriy", age: 19, group: "B", marks: [55, 65, 60] },
  ]);
};

const getAllStudents = async () => {
  return await Student.find();
};

const updateAge = async (name, newAge) => {
  return await Student.updateOne({ name }, { age: newAge });
};

const deleteFromGroup = async (group) => {
  return await Student.deleteMany({ group });
};

const getOlderThan = async (age) => await Student.find({ age: { $gt: age } });

const getMarksAbove = async (score) =>
  await Student.find({ marks: { $elemMatch: { $gt: score } } });

const getNameStartsWithA = async () =>
  await Student.find({ name: { $regex: "^A", $options: "i" } });

const getSortedByAge = async () => await Student.find().sort({ age: 1 });

const getAvgMarks = async () =>
  await Student.aggregate([
    { $project: { name: 1, avgMark: { $avg: "$marks" } } },
  ]);

const groupByGroup = async () =>
  await Student.aggregate([{ $group: { _id: "$group", count: { $sum: 1 } } }]);

const getTotalAvg = async () =>
  await Student.aggregate([
    { $unwind: "$marks" },
    { $group: { _id: null, totalAvg: { $avg: "$marks" } } },
  ]);

module.exports = {
  addStudents,
  getAllStudents,
  updateAge,
  deleteFromGroup,
  getOlderThan,
  getMarksAbove,
  getNameStartsWithA,
  getSortedByAge,
  getAvgMarks,
  groupByGroup,
  getTotalAvg,
};
