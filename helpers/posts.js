var fs = require('fs');
var path = require('path');
// var manifest = require('../posts/manifest.json');
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

					_scope.manifest = JSON.parse(data);
					fs.close(fd);

					if (callback) {
						callback(_scope.manifest);
					}
					
				});
			});
		});

		function returnPosts() {
			return JSON.parse(_scope.manifest);
		}
		
		// fs.open(path.join(__dirname, '/../posts/manifest.json'), 'r+', function(err, fd) {
		// 	if (err) throw err;
		// 	console.log(fd);
		// });

		// function readFile(err, fd) {
		// 	if (err) throw err;
		// }

	};

	// getPosts();
};

// console.log(manifest);
// manifest.posts.push({
// 	'title': 'second',
// 	'description': 'this is the second post, bro',
// 	'filename': 'third.md'
// });

// console.log(manifest);

// var postHelper = new PostHelper();

module.exports = PostHelper;