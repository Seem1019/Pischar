/* eslint-disable no-undef */
module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      skipMD5: true,
    },
    autoStart: false,
    instance: {},
  },

  useSharedDBForAllJestWorkers: false,
};
