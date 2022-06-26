const fs = require("fs");
const path = require("path");
const { platform, arch } = require("os");
const { downloadFile } = require("./utils/download");
const { unzip } = require("./utils/zip");
const { torUrl, localTorDir } = require("./config");

const installLocalTor = async (torInstallDir, torDownloadUrl) => {
    const TOR_LOCAL_TEMP_DIR = `${torInstallDir}/temp`;
    const TOR_ZIP_FILE = `${TOR_LOCAL_TEMP_DIR}/tor.zip`;
    try {
        // // create the temp directory if it doesn't exist
        if (!fs.existsSync(TOR_LOCAL_TEMP_DIR)) {
            fs.mkdirSync(TOR_LOCAL_TEMP_DIR, { recursive: true });
        }
        //download the zip file
        await downloadFile(torDownloadUrl, TOR_ZIP_FILE);

        // //unzip the zip file
        await unzip(TOR_ZIP_FILE, path.resolve(torInstallDir));

        // //delete the temp directory
        fs.rmSync(TOR_LOCAL_TEMP_DIR, { recursive: true, force: true });

        // Move data files to the correct location
        let dataSrc = path.resolve(torInstallDir, "Data", "Tor");
        let dataDest = path.resolve(torInstallDir, "tor");
        let dataFiles = fs.readdirSync(dataSrc);
        dataFiles.forEach((file) =>
            fs.renameSync(path.resolve(dataSrc, file), path.resolve(dataDest, file))
        );
        fs.rmSync(`${torInstallDir}/Data`, { recursive: true, force: true });
    } catch (err) {
        throw new Error(`Install Tor failed: ${err}`);
    }
};

if (String(platform) !== "win32")
    throw new Error("Only windows is supported at this time!");

const TOR_DOWNLOAD_URL = `${torUrl.dirUrl}/${torUrl.version}/${torUrl[`win${String(arch).substring(1)}`]
    }`;

installLocalTor(localTorDir, TOR_DOWNLOAD_URL).then(() => {
    console.log("Tor installed successfully");
});
