module.exports = function (app,models) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var stockModel=models.stockModel;
    app.post('/api/project/login', passport.authenticate('local'), login);
    app.post ("/api/project/upload", upload.single('myFile'), uploadImage);
    app.post('/api/project/logout', logout);
    app.post ('/api/project/register', register);
    app.get ('/api/project/loggedin', loggedin);
    // app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    // app.get('/auth/facebook/callback',passport.authenticate('facebook', {
    //     failureRedirect: '/project/#/login'
    // }), function(req, res){
    //     var url = '/project/#/user/' + req.user._id.toString();
    //     res.redirect(url);
    // });

    app.get("/api/project/person", findUser);
    app.get("/api/project/all", findAllUsers);
    app.post("/api/project/person", createUser);
    app.get("/api/project/stocks/:userid",getStocks);
    app.get("/api/project/person/:userId", findUserById);
    app.post("/api/project/favs/", addToFavs);
    app.put("/api/project/person/:userId", updateUser);
    app.delete("/api/project/person/:userId", deleteUser);

    function login(req, res) {
        console.log("req.user");
        console.log("IN LOGIN 2");
        var user = req.user;
        res.json(user);
    }

    function loggedin(req, res) {
        console.log("IN LOGGED IN 2");
        console.log("USER");
        console.log(req.user);
        res.send(req.isAuthenticated() ? req.user : '0');
    }


    function logout(req, res) {
        console.log("LOGGED OUT 2");
        req.logOut();
        res.send(200);
    }


    passport.use(new LocalStrategy(localStrategy));

    passport.serializeUser(serializeUser1);
    passport.deserializeUser(deserializeUser1);




    function localStrategy(username, password, done) {
        console.log(password);
        console.log("In Local Strategy 2");
        //password = bcrypt.hashSync(password);
        personModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log("inside promise");
                    console.log(user);
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    var personModel = models.personModel;


    function register (req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        personModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
            );
    }


    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        personModel
            .updateUser(userId, newUser)
            .then(
                function (stats) {
                    // console.log(stats);
                    res.send(stats);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findAllUsers(req,res) {
        var userId=req.user;
        personModel.
            findAllUsers()
            .then(
                function (users) {
                    console.log(users);
                    res.json(users);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function findUserById(req, res) {
        var id = req.params.userId;
        personModel
            .findUserById(id)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUser(req, res) {
        console.log("Here");

        var username = req.query.username;
        var password = req.query.password;
        console.log(username);
        console.log(password);
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res){
        var username = req.query.username;
        personModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("user");
                    console.log(user);
                    if (user == [] || user == null) {
                        console.log(user);
                        res.status(500).send("User not found");
                    }
                    else {
                        console.log("yahan");
                        res.json(user);
                    }},
                function(err) {
                    res.status(404).send(err);
                }
            );
    }

    // function findUserByUsername(req, res) {
    //     var username = req.query.username;
    //     userModel
    //         .findUserByUsername(username)
    //         .then(
    //             function (user) {
    //                 if (user) {
    //                     res.json(user);
    //                 } else {
    //                     res.sendStatus(500);
    //                 }
    //             }
    //         );
    // }


    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        personModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if (user !== null) {
                        res.json(user)
                    }
                    else {
                        res.status(500).send("User not found");
                    }},
                function (err) {
                    console.log(err);
                    res.sendStatus(500).send(err);
                }
            );
    }

    function getStocks(req,res){

        var userid=req.params.userid;
        personModel
            .findUserById(userid)
            .then(function(user){
                res.json(user);
            })
    }


    function deleteUser(req, res) {
        var userId = req.params.userId;
        personModel
            .deleteUser(userId)
            .then(
                function (user) {
                    // console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function createUser(req, res){
        var user = req.body;
        personModel
            .createUser(user)
            .then(
                function (user) {
                    // console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function addToFavs(req,res){
        var user=req.body;
        var tickr = user.tickr;
        console.log("yes");
        console.log(tickr);
        stockModel
            .findStockByTicker(tickr)
            .then(
                function(stock){
                    console.log("HERE");
                    console.log(stock._id);
                    personModel
                        .addTickr(user.id,stock)
                        .then(
                            function (user) {
                                personModel
                                    .findUserById(user.id)
                                    .then(function(user){
                                        console.log("YESS");
                                        res.json(user);
                                    });

                            },
                            function (error) {
                                res.statusCode(400).send(error);
                            }
                        );
                }
            )

    }
    function serializeUser1(user, done) {
        console.log("IN SR 2");
        done(null, user);
    }

    function deserializeUser1(user, done) {
        console.log("IN DSR 2");
        personModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function uploadImage(req, res) {
        console.log("Yes heere");
        var myFile        = req.file;

        var userId = req.body.userId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;
        personModel
            .findUserById(userId)
            .then(
                function (user) {
                    user.url = '/uploads/'+filename;
                    user.save();
                    res.redirect("/project/#/user/"+userId+"/main");
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }
};