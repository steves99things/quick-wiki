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

// GET a post
router.get('/posts/:index', function(req, res) {
	var postIndex = req.params.index;
	postHelper.getPostByIndex(postIndex, function(manifest, post) {
		postHelper.getPostContent(post.filename, function(content) {
			res.render('detail/post', {
				layout: 'detail/detail-layout',
				posts: manifest.posts,
				title: post.title,
				content: content,
				activeIndex: postIndex
			});
		});
	});
});

// EDIT a post
router.put('/posts/:filename', function(req, res) {

});


module.exports = router;
