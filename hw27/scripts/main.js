const connectDB = require("../config/db");
const studentService = require("../services/student.service");

const run = async () => {
  await connectDB();

  await studentService.addStudents();
  console.log(await studentService.getAllStudents());
  await studentService.updateAge("Ivan", 22);
  await studentService.deleteFromGroup("A-31");

  console.log(await studentService.getOlderThan(20));
  console.log(await studentService.getMarksAbove(85));
  console.log(await studentService.getNameStartsWithA());
  console.log(await studentService.getSortedByAge());

  console.log(await studentService.getAvgMarks());
  console.log(await studentService.groupByGroup());
  console.log(await studentService.getTotalAvg());

  process.exit();
};

run();
