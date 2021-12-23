const { PORT } = require('./common/config.ts');
const httpServer = require('./app.ts');

httpServer.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

