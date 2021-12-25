const { PORT } = require('./common/config');
const httpServer = require('./app');

// process.on('uncaughtException', function (err) {
//   console.log(err.message);
//   process.exit(1);
// });


httpServer.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

