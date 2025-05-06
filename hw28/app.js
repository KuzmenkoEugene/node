const { sequelize } = require('./models');
const seed = require('./seed/seed');
const runQueries = require('./queries/queries');

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('DB synced');
    await seed();
    console.log('Data seeded');
    await runQueries();
  } catch (err) {
    console.error(err);
  } finally {
    await sequelize.close();
  }
})();
