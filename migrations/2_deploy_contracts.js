const FileSafe = artifacts.require("FileSafe");

module.exports = function(deployer) {
	//Deploy Contract
	deployer.deploy(FileSafe);

};
