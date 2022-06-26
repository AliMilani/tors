const fs = require("fs");
const https = require("https");
module.exports.downloadFile = downloadFile = (url, dest) =>
    new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        let request = https.get(url, function (response) {
            response.pipe(file);
        });
        file.on("finish", () => {
            file.close();
            resolve();
        });
        file.on("error", (err) => {
            fs.unlink(dest);
            reject(err);
        });
        request.on("error", (err) => {
            if (err.code === "ENOTFOUND" || err.code === "ETIMEDOUT") {
                reject(new Error("Unable to download the file!"));
            }
            reject(err);
        });
    });
