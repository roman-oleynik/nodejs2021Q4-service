const { PORT } = require('./common/config');
const httpServer = require('./app');


httpServer.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

