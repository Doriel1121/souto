cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-facebook4.FacebookConnectPlugin",
      "file": "plugins/cordova-plugin-facebook4/www/facebook-native.js",
      "pluginId": "cordova-plugin-facebook4",
      "clobbers": [
        "facebookConnectPlugin"
      ]
    },
    {
      "id": "cordova-plugin-sim.Sim",
      "file": "plugins/cordova-plugin-sim/www/sim.js",
      "pluginId": "cordova-plugin-sim",
      "merges": [
        "window.plugins.sim"
      ]
    },
    {
      "id": "cordova-plugin-sim.SimAndroid",
      "file": "plugins/cordova-plugin-sim/www/android/sim.js",
      "pluginId": "cordova-plugin-sim",
      "merges": [
        "window.plugins.sim"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-facebook4": "6.4.0",
    "cordova-plugin-sim": "1.3.3",
    "cordova-plugin-whitelist": "1.3.4"
  };
});