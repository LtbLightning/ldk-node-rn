const request = require('request');
const fs = require('fs');
var AdmZip = require('adm-zip');

var binaryName = "LDKNodeFFI.xcframework.zip"

var fileUrl = `https://github.com/lightningdevkit/ldk-node/releases/download/v0.2.2/${binaryName}`;

const src = `ios/${binaryName}`;
const target = 'ios/';

try {
  request(fileUrl)
    .pipe(fs.createWriteStream(src))
    .on('close', function () {
      var zip = new AdmZip(src);
      zip.extractAllTo(target, true);
      fs.unlinkSync(src);
    });
} catch (err) {
  console.log(err);
}
