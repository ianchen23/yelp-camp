var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var middleware = require("../middleware");

// INDEX
router.get("/", function(req, res) {
    Campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    })
}),

// NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new");
});

// CREATE
router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var img = req.body.img;
    var desc = req.body.desc;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCamp = {name: name, image: img, price: price, description: desc, author: author};
    Campground.create(newCamp, function(err, newCampRtn){
        if(err) {
            console.log(err)
        } else {
            req.flash("success", "Campground added!");
            res.redirect("/campgrounds");
        }
    });
});

// SHOW
router.get("/:id", function(req, res) {
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground) {
            res.send("not found!");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT
router.get("/:id/edit", middleware.checkCampOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, camp){
        if (err || !camp) {
            console.log(err);
        } else {
            res.render("campgrounds/edit", {camp:camp});
        }
    });
});

// UPDATE
router.put("/:id", middleware.checkCampOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.newCamp, function(err, camp){
        if (err || !camp) {
            console.log(err);
        } else {
            req.flash("success", "Campground edited!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

// DESTROY
router.delete("/:id", middleware.checkCampOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err, camp) {
        if (err || !camp) {
            console.log(err);
        } else {
            req.flash("success", "Campground deleted!");
            res.redirect("/campgrounds");
        }
    })
});


module.exports = router;