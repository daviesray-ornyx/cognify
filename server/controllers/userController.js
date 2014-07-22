var User = require('../models/user');

var userController = {

    list : function(req, res){
        User.find().populate('questions').exec((function(err,tests){
            if(err){
                return res.status(500);
            }
            else{
                return res.json(tests);
            }
        }));
    },

    find : function(req, res){
        User.findById(req.params.id,function(err,user){
            if(err)
                return res.json({"Error" : "Erorr finding user"});

            if(!user)
                return res.json({"Error" : "User not found"});

            return res.json(user);
        });
    },

    register : function(req, res){
        User.count({username : req.body.username},function(err,c){
            if(err){
                res.status = 500;
                return res.send(500,"Error");
            }
            if(c > 0){
                res.status = 500;
                return res.send(500,"Error");
            }
            else{
                var user = new User({
                    username : req.body.username,
                    password : req.body.password,
                    totalScore : 0,
                    totalPossibleScore : 0,
                    IQ : 1,
                    tests : []
                });
                user.save(function(err){
                    if(err){
                        res.status = 500;
                        return res.send(500,"Error");
                    }
                    else{
                        return res.json(user);
                    }
                });
            }
        });
    },

    login : function (req, res) {
        User.findOne({username : req.body.username, password : req.body.password},function(err,user){
            if(err){
                console.log("Login failed 1");
                res.status = 500;
                return res.send(500,"Error");
            }
            if(!user){
                console.log("Login failed 2: " + req.body.username + " ------- " + req.body.password);
                res.status = 500;
                return res.send(500,"Nothing found here");
            }
            else{
                console.log("Login succeeded");
                return res.json(user);
            }
        });
    },

    logout : function (req, res) {

    },

    updateScore : function(req, res){
        //editing user details

        User.findOne({username : req.body.username},function(err,user){
            if(err){
                console.log("Error finding user");
                res.status = 500;
                return res.send(500,"Error");
            }
            else if(!user){
                console.log("No user with specified username");
                res.status = 500;
                return res.send(500,"Error");
            }
            else{
                user.tests.addToSet(req.body.test); // Add test reference
                user.totalScore += req.body.testScore;  // Increment totalScore by the score
                user.totalPossibleScore += req.body.test.weight; // Increment totalPossibleScore
                user.IQ = user.totalScore/user.totalPossibleScore;          // Update IQ

                user.save(function(err){
                    if(err){
                        console.log("Error updating user");
                        res.status = 500;
                        return res.send(500,"Error");
                    }
                    else{
                        return res.json({"Success" : "Changes committed successfully!"});
                    }

                });
            }
        });
    },

    delete : function(req, res){
        User.findById(req.params.id,function(err,user){
            if(err)
                return res.json({"Error" : "Erorr finding user"});

            if(!user)
                return res.json({"Error" : "No user with specified id"});

            user.remove(function(err){
                if(err)
                    return res.json({"Error" : "Error deleting user!"});

                return res.json({"Success" : "User deleted successfully!"});
            });
        });
    }
};

module.exports = userController;
