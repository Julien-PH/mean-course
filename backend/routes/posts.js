const express = require("express");
const Post = require('../models/post');

const router = express.Router();

router.post("", (req,res,next) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content
	});
	post.save().then(createdPost => {
		res.status(201).json({
			message: 'Post ajouté avec succès',
			postId: createdPost._id
		});
	});
});

router.put("/:id", (req, res, next) => {
	Post.updateOne({_id: req.params.id}, {title: req.body.title, content: req.body.content} ).then(result => {
		//console.log(req.params.id);
		res.status(200).json({message: 'post mis à jour'});
	});
})

router.get("",(req,res, next) => {
	Post.find().then(documents => {
		res.status(200).json({
			message: 'Les posts sont bien passés',
			posts: documents
		});
	});
});

router.get("/:id",(req,res, next) => {
	Post.findById(req.params.id).then(post => {
		if (post) {
			res.status(200).json(post);
		} else {
			res.status(404).json({message: 'post introuvable'});
		};
	});
});

router.delete("/:id", (req, res, next) => {
	Post.deleteOne({_id: req.params.id}).then(result => {
		console.log(req.params.id);
		res.status(200).json({message: "Post supprimé"});
	});
});

module.exports = router;