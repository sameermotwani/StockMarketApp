/**
 * Created by aniru on 2/28/2017.
 */


module.exports = function (app, models) {
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require('bcrypt-nodejs');

    app.post("/api/login", passport.authenticate('local'), login);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/loggedin", loggedin);
    app.get('/auth/facebook', passport.authenticate('facebook', {scope : 'email'}));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));
    app.get("/api/user", findUser);
    app.post("/api/user", createUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.delete("/api/user/:userId", deleteUser);

    var userModel = models.userModel;
    var personModel = models.personModel;
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new LocalStrategy(localStrategy));


    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));

    function localStrategy(username, password, done) {
        console.log("In localStrategy");
        userModel
            //.findUserByCredentials(username, bcrypt.hashSync(password))
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log("success "+user);
                    if(user && user.username === username && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function (err) {
                    console.log("Error occured " +err);
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        console.log("In serializeUser");
        done(null, user);
    }

    function deserializeUser(user, done) {
        console.log("In deserializeUser ");
        console.log(user);
        userModel
            .findUserById(user._id)
            .then(
                function(user1){
                    if(user1 == null){
                        console.log("Reached here");
                        try {
                            personModel
                                .findUserById(user._id)
                                .then(
                                    function (user) {
                                        console.log("here1");
                                        done(null, user);
                                    },
                                    function (err) {
                                        console.log("here3");
                                        done(err, null);
                                    }
                                );
                        }
                        catch(e){
                            console.log(e);
                        }
                    }
                    else {
                        done(null, user);
                    }
                },
                function(err){
                    console.log("Error");
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
            );
    }

    function logout(req, res) {
        console.log("In logout");
        req.logout();
        res.send(200);
    }

    function login(req, res) {
        console.log("In login");
        res.json(req.user);
    }

    function loggedin(req, res) {
        console.log("In loggedin");
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        console.log("In register");
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
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

    function facebookStrategy(token, refreshToken, profile, done) {
        console.log("profile is ");
        console.log(profile);
        userModel
            .findUserByFacebookId(profile.id)
            .then(
                function (facebookUser) {
                    if(facebookUser) {
                        return done(null, facebookUser);
                    } else {
                        facebookUser = {
                            username: profile.displayName.replace(/ /g, ''),
                            email: profile.emails[0].value,
                            facebook: {
                                token: token,
                                id: profile.id
                            }
                        };
                        userModel
                            .createUser(facebookUser)
                            .then(
                                function (user) {
                                    done(null, user);
                                },
                                function (error) {
                                    done(error, null);
                                }
                            )
                    }
                },
                function (error) {
                    done(error, null);
                }
            );
    }

    function createUser(req, res) {
        var newUser = req.body;
        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(userId, newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
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
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user)
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByCredentials(req, res){
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    res.json(user)
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );

    }

    function deleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteUser(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
}