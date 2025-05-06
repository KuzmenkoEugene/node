const { Student, Course } = require("../models");
const { Op } = require("sequelize");

module.exports = async () => {
  console.log("\n1. Список студентов с их средним баллом:");
  const students = await Student.findAll({
    include: {
      model: Course,
      through: { attributes: ["grade"] },
    },
  });

  students.forEach((s) => {
    const grades = s.Courses.map((c) => c.Enrollment.grade);
    const avg = grades.length
      ? grades.reduce((a, b) => a + b) / grades.length
      : 0;
    console.log(`${s.name}: ${avg.toFixed(2)}`);
  });

  console.log('\n2. Студенты на "SQL Basics":');
  const sqlCourse = await Course.findOne({ where: { title: "SQL Basics" } });
  const sqlStudents = await sqlCourse.getStudents();
  sqlStudents.forEach((s) => console.log(s.name));

  console.log("\n3. Топ-1 студент:");
  const avgList = students
    .map((s) => {
      const grades = s.Courses.map((c) => c.Enrollment.grade);
      const avg = grades.length
        ? grades.reduce((a, b) => a + b) / grades.length
        : 0;
      return { name: s.name, avg };
    })
    .sort((a, b) => b.avg - a.avg);

  console.log(`${avgList[0].name}: ${avgList[0].avg.toFixed(2)}`);

  console.log("\n4. Количество студентов в каждом курсе:");
  const courses = await Course.findAll({
    include: Student,
  });
  courses.forEach((c) => {
    console.log(`${c.title}: ${c.Students.length}`);
  });

  console.log("\n5. Курсы со средней оценкой 85:");
  for (const course of courses) {
    const grades = course.Students.map((s) => s.Enrollment.grade);
    const avg = grades.length
      ? grades.reduce((a, b) => a + b) / grades.length
      : 0;
    if (avg > 85) {
      console.log(`${course.title}: ${avg.toFixed(2)}`);
    }
  }
};
