var fs = require('fs');
var path = require('path');
var _scope = this;

// initially, we did this using buffers, but is it possible to do without them?

var PostHelper = function() {
	var _self = this;
	var postPath = path.join(__dirname, '/../posts/')
	var manifestPath = path.join(__dirname, '/../posts/manifest.json');

	this.getManifest = function(callback) {
		fs.readFile(manifestPath, 'utf8', function(err, data) {

			if (callback) {
				callback(JSON.parse(data));
			}
		});
	};

	this.addPost = function(post) {

		_self.getManifest(function(manifest) {
			manifest.posts.push(post);

			fs.writeFile(manifestPath, JSON.stringify(manifest, null, 4), function(err) {
				if (err) throw err;
			});
		});
	};

	this.getPostByIndex = function(index, callback) {
		_self.getManifest(function(manifest) {
			if (callback) {
				callback(manifest, manifest.posts[index]);
			}
		});
	};

	this.getPostContent = function(filename, callback) {
		fs.readFile(path.join(postPath, filename), 'utf8', function(err, data) {
			if (err) console.error(err.stack);
			if (callback) {
				callback(data);
			}
		});
	};
};

// 	this.getManifest = function(callback) { 
// 		fs.stat(loc, function(err, stats) {
// 			if (err) throw err;
// 			fs.open(loc, 'r+', function(err, fd) {
// 				if (err) throw err;
// 				var buffer = new Buffer(stats.size);

// 				fs.read(fd, buffer, 0, buffer.length, null, function(err, bytesRead, buffer) {
// 					var data = buffer.toString('utf8', 0, buffer.length);

// 					fs.close(fd);

// 					if (callback) {
// 						callback(JSON.parse(data));
// 					}
					
// 				});
// 			});
// 		});
// 	};


// 	// post is a post object {title, url, description}
// 	this.addPost = function(callback, post) {
// 		console.log('the callback: ' + callback);
// 		console.log('the post: ' + post);
// 		fs.stat(loc, function(err, stats) {
// 			if (err) throw err;
// 			fs.open(loc, 'r+', function(err, fd) {
// 				if (err) throw err;
// 				var buffer = new Buffer(stats.size);

// 				fs.read(fd, buffer, 0, buffer.length, null, function(err, bytesRead, buffer) {
// 					var data = buffer.toString('utf8', 0, buffer.length);

// 					// add the post to the manifest
// 					var manifest = JSON.parse(data);
// 					manifest.posts.push(post);

// 					console.log(post);

// 					fd = manifest;

// 					fs.close(fd, function() {
// 						console.log('complete');
// 					});

// 					if (callback) {
// 						callback(manifest);
// 					}

// 				});
// 			});
// 		});
// 	};
// };

module.exports = PostHelper;