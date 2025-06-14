const {configure} = require('genkit');

module.exports = configure({
  logConfig: {
    logLevel: 'debug',
  },
  enableTracingAndMetrics: true,
});
