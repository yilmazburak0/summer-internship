const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              hack: `true;@import "${require.resolve("./src/assets/less/yoda-theme.less")}";`,
            },
            javascriptEnabled: true,
          },
        },
        modifyLessRule: (lessRule, context) => {
          lessRule.use = lessRule.use.filter(i => !i.loader.includes('resolve-url-loader'));
          return lessRule;
        }
      },
    },
  ],
};