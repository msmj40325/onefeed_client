const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // https: true, // Required to use Facebook API
    // server: 'https', // Same as above, but not deprecated. This breaks Websocket connections though.
  },
});
