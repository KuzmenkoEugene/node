const { Student, Course } = require("../models");

module.exports = async () => {
  const [s1, s2, s3] = await Student.bulkCreate([
    { name: "Ivan" },
    { name: "Olena" },
    { name: "Maksym" },
  ]);

  const [c1, c2, c3] = await Course.bulkCreate([
    { title: "Node.js" },
    { title: "SQL Basics" },
    { title: "React" },
  ]);

  await s1.addCourse(c1, { through: { grade: 90 } });
  await s1.addCourse(c2, { through: { grade: 85 } });
  await s2.addCourse(c2, { through: { grade: 95 } });
  await s2.addCourse(c3, { through: { grade: 80 } });
  await s3.addCourse(c1, { through: { grade: 70 } });
  await s3.addCourse(c3, { through: { grade: 88 } });
};
