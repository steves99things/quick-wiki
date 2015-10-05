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

// GET posts page
var postHelper = new PostHelper();
router.get('/posts', function(req, res, next) {
	postHelper.getManifest(function(manifest) {
		res.render('posts', {
			title: 'Posts',
			posts: manifest.posts
		});
	});
});

// CREATE a post
router.post('/posts', function(req, res) {
	var post = {};
	if (req.body.title) post.title = req.body.title;
	if (req.body.description) post.description = req.body.description;
	if (req.body.filename) post.filename = req.body.filename;

	postHelper.addPost(post);

	res.redirect('posts');
});


// add the post to our manifest to see if it works
var post = {
	'title' : 'test post', 
	'description' : 'this is a description of a test post', 
	'filename' : 'test123.md'
};


module.exports = router;
