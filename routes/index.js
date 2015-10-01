var express = require('express');
var router = express.Router();
var path = require('path');
var Files = require('../helpers/files');
var PostHelper = require('../helpers/posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET files page 
var fileUrl = '/files';
var files = new Files(path.join(__dirname, '/../public' + fileUrl), fileUrl);
router.get('/files', function(req, res, next) {
	res.render('files', {
		title: 'Files',
		files: files.files
	});
});

var postHelper = new PostHelper();
postHelper.getPosts(function(manifest) {
	router.get('/posts', function(req, res, next) {
		res.render('posts', {
			title: 'Posts',
			posts: manifest.posts
		});
	});
});


module.exports = router;
