var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "Please Login First!");
        res.redirect("/login");
    }
}

middlewareObj.checkCampOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, camp) {
            if (err || !camp) {
                console.log(err);
            } else {
                if (req.user._id.equals(camp.author.id)) {
                    next();
                } else {
                    req.flash("error", "This campground was created by someone else.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First!")
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.cmt_id, function(err, comment) {
            if (err || !comment) {
                console.log(err);
            } else {
                if (req.user._id.equals(comment.author.id)) {
                    next();
                } else {
                    req.flash("error", "This comment was created by someone else.");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please Login First!")
        res.redirect("/login");
    }
}

module.exports = middlewareObj;