var fs = require('fs');
var path = require('path');
var _scope = this;

var PostHelper = function() {

	var loc = path.join(__dirname, '/../posts/manifest.json');

	this.getPosts = function(callback) {
		fs.stat(loc, function(err, stats) {
			if (err) throw err;
			fs.open(loc, 'r+', function(err, fd) {
				if (err) throw err;
				var buffer = new Buffer(stats.size);

				fs.read(fd, buffer, 0, buffer.length, null, function(err, bytesRead, buffer) {
					var data = buffer.toString('utf8', 0, buffer.length);

					fs.close(fd);

					if (callback) {
						callback(JSON.parse(data));
					}
					
				});
			});
		});
	};
};

module.exports = PostHelper;