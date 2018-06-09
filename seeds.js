// setup
var mongoose    =   require("mongoose"),
    Campground  =   require("./models/campground"),
    Comment     =   require("./models/comment");

var campgrounds = [
    {
        name: "Salmon Creek",
        image: "https://bit.ly/2H0KX2M",
        description: "Beautiful creek, lots of salmon! It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        author: {id: null, username: "System"}
    },
    {
        name: "Granite Hill",
        image: "https://bit.ly/2IUxXxk",
        description: "Huge granite hill, no bathroom... Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        author: {id: null, username: "System"}
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://bit.ly/2L3QojP",
        description: "Gorgeous sky view, companied by mountain goats. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        author: {id: null, username: "System"}
    }
];

var defaultComment = {
    text: "This place is great, but I wish there was internet",
    author: {id: null, username: "Homer"}
};

function seedDB(){
    Campground.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("All campgrounds removed");
            Comment.remove({}, function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("All comments removed");
                    campgrounds.forEach(function(camp){
                        Campground.create(camp, function(err, campground){
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("A campground is added")
                                Comment.create(defaultComment, function(err, comment){
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("A comment is created");
                                    }
                                })
                            }
                        });
                    });
                }
            });
        }
    });
}

module.exports = seedDB;


