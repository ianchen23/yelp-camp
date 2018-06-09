var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// COMMENT-NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {camp:campground});
        }
    });
});

// COMMENT-CREATE
router.post("/", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if (err || !campground) {
            console.log(err);
        } else {
            var newComment = {
                text: req.body.commentText,
                author: {
                    id: req.user._id, 
                    username: req.user.username
                }
            };
            Comment.create(newComment, function(err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Comment added!");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});

// COMMENT-EDIT
router.get("/:cmt_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.cmt_id, function(err, comment) {
        if (err || !comment) {
            console.log(err);
        } else {
            res.render("comments/edit", {camp_id: req.params.id, comment: comment});
        }
    });
});

// COMMENT-UPDATE
router.put("/:cmt_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.cmt_id, req.body.comment, function(err) {
        if (err || !comment) {
            console.log(err);
        } else {
            req.flash("success", "Comment updated!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// COMMENT-DELETE
router.delete("/:cmt_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.cmt_id, req.body.comment, function(err) {
        if (err || !comment) {
            console.log(err);
        } else {
            req.flash("success", "Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


module.exports = router;