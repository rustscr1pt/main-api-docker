const imageSize = require("image-size");
const fs = require("fs");

function groupSizeData(filePath) {
    try {
        const {size} = fs.statSync(filePath);
        const rounded_size = Math.round(size / 1000);
        const dimensions = imageSize(filePath);
        return {
            fileSize : `${rounded_size} kb`,
            fileDimensions : `${dimensions.width}x${dimensions.height}`
        };
    }
    catch (err) {
        console.log(err)
        return {
            fileSize : `Err`,
            fileDimensions : `Err`
        };
    }
}

module.exports = {groupSizeData}