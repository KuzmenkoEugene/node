module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Enrollment", {
    grade: DataTypes.INTEGER,
  });
};
