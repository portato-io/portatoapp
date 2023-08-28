const { fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = function override(config, env) {
  // On-demand imports of Ant Design components
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true, // This means use "less" for styles.
  })(config);

  // LESS support with customization
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#ff0000', // Override the primary color.
        // Add other Ant Design variables here if needed.
      },
    },
  })(config);

  return config;
};
