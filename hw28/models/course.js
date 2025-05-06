module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Course", {
    title: DataTypes.STRING,
  });
};
