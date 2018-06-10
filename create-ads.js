var GIFEncoder = require('gifencoder');
var encoder = new GIFEncoder(317, 189);
var pngFileStream = require('png-file-stream');
var fs = require('fs');
//var config = require('./static/admin/config.yml');
var config = {
	media_folder: 'static/img',
	public_folder: '/img'
}
var ads = require('./_data/ads.json');

var adsPath = ads.map(ads => `./${ads.image.replace(config.public_folder, config.media_folder)}`);

console.log(adsPath);

pngFileStream(adsPath)
  .pipe(encoder.createWriteStream({ repeat: -1, delay: 500, quality: 10 }))
  .pipe(fs.createWriteStream('myanimated.gif'));
