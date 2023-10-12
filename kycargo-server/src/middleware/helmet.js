const helmet = require('helmet');

module.exports = async (app) => {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["*"],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));
};
