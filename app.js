// CONFIGURATION
var express     =   require("express"),
    app         =   express(),
    mongoose    =   require("mongoose"),
    passport    =   require("passport"),
    LocalStrategy = require("passport-local"),
    Campground  =   require("./models/campground"),
    Comment     =   require("./models/comment"),
    User        =   require("./models/user"),
    methodOverride = require("method-override"),
    flash       = require("connect-flash"),
    seedDB      =   require("./seeds");

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
// mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.connect("mongodb://ianchen23:c89t&34q@ds245150.mlab.com:45150/heroku_5vlhdkf5");

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "ibuprofen tablets 200 mg",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.user = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

// ROUTES
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

// DB SEED:
// seedDB();

// RUN
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("YelpCamp Server is running!")
});