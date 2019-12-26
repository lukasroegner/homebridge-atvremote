
const AtvRemoteApi = require('./atv-remote-api');

/**
 * Initializes a new platform instance for the ATV remote plugin.
 * @param log The logging function.
 * @param config The configuration that is passed to the plugin (from the config.json file).
 */
function AtvRemotePlatform(log, config) {
    const platform = this;

    // Checks whether a configuration is provided, otherwise the plugin should not be initialized
    if (!config) {
        return;
    }

    // Defines the variables that are used throughout the platform
    platform.log = log;
    platform.config = config;
    platform.accessories = [];

    // Initializes the configuration
    platform.config.apiPort = platform.config.apiPort || 40222;
    platform.config.apiToken = platform.config.apiToken || null;
    platform.config.atvremoteCommand = platform.config.atvremoteCommand || 'atvremote';
    platform.config.appleTvs = platform.config.appleTvs || [];

    // Starts the API
    platform.atvRemoteApi = new AtvRemoteApi(platform);
}

/**
 * Configures a previously cached accessory.
 * @param accessory The cached accessory.
 */
AtvRemotePlatform.prototype.configureAccessory = function (accessory) {}

/**
 * Defines the export of the file.
 */
module.exports = AtvRemotePlatform;
