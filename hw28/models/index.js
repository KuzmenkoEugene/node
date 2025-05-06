const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Student = require("./student")(sequelize, DataTypes);
const Course = require("./course")(sequelize, DataTypes);
const Enrollment = require("./enrollment")(sequelize, DataTypes);

Student.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(Student, { through: Enrollment });

module.exports = {
  sequelize,
  Student,
  Course,
  Enrollment,
};
