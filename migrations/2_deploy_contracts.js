const WeenusToken = artifacts.require("WeenusToken");


module.exports = function (deployer) {
  deployer.deploy(WeenusToken);
};
