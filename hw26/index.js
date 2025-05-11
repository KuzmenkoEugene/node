const { seed } = require('./data/seed');
const { runQueries } = require('./data/queries');

(async () => {
  await seed();
  await runQueries();
})();
