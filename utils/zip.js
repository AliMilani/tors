const extract = require("extract-zip");

module.exports.unzip = unzip = async (zipFile, dest) => await extract(zipFile, { dir: dest });