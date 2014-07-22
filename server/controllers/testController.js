var Test = require('../models/test');
var User = require('../models/user');
var Question = require('../models/question');


var testController = {
    list : function(req, res){
        Test.find().populate('questions').exec(function(err,tests){
            if(err){
                return res.status(204);
            }
            else{
                return res.json(tests);
            }
        })
    },

    getNextTest : function(req, res){
        if(!req.body.username){
            Test.count(function(err, count){
                if(err){
                    res.status = 500;
                    return res.send(500,"Error retrieving test");
                }
                else{
                    var x = Math.floor(Math.random() * count);
                    Test.findOne().skip(x).populate('questions').exec(function(err,tester){
                        if(err){
                            res.status = 500;
                            return res.send(500,"Error retrieving test");
                        }
                        else{
                            return res.json(tester);
                        }
                    });
                }
            });
        }
        else{
            User.findOne({username : req.body.username},function(err,user){
                if(err)
                {
                    res.status = 500;
                    return res.send(500,"Error retrieving test");
                }
                else if(!user)
                {
                    res.status = 500;
                    return res.send(500,"Error retrieving test");
                }
                else if(user){
                    // find by user
                    Test.count(function(err, count){
                        if(err){
                            res.status = 500;
                            return res.send(500,"Error retrieving test");
                        }
                        else{
                            var x = Math.floor(Math.random() * count);
                            Test.findOne().skip(x).populate('questions').exec(function(err,test){
                                if(err){
                                    res.status = 500;
                                    return res.send(500,"Error retrieving test");
                                }
                                else{
                                    return res.send(test);
                                }
                            });
                        }
                    });
                }
            });
        }

        /*Test.findById(req.params.userId,function(err,test){
            if(err)
                return res.json({"Error" : "Erorr finding test"});

            if(!test)
                return res.json({"Error" : "No test with specified id"});

            return res.json(test);
        });*/
    },

    create : function(req, res){
        var test = new Test({
            scenario : req.body.scenario,
            weight : req.body.weight
        });
        req.body.questions.forEach(function(question){
            var query = new Question({
                description : question.description,
                points : question.points,
                answers : question.answers
            })
            //Add all to array
            test.questions.addToSet(query);
            query.save(function(err){
                console.log('Saved query');
            })
        });
        test.save(function(err){
            if(err){
                res.status = 500;
                return res.send(500,"Error");
            }
            else{
                return res.json({'message' : 'success'});
            }
        });
    },

    edit : function(req, res){
        Test.findById(req.params.id,function(err,test){
            if(err)
                return res.json({"Error" : "Erorr finding test"});

            if(!test)
                return res.json({"Error" : "No test with specified id"});

            // everything is fine thus far
            test.description = req.body.description;
            test.weight = req.body.weight;
            test.answers = req.body.answers;

            test.save(function(err){
                if(err)
                    return res.json({"Error" : "Error saving changes!"});

                return res.json({"Success" : "Changes committed successfully!"});
            });
        });
    },

    delete : function(req, res){
        Test.findById(req.params.id,function(err,test){
            if(err)
                return res.json({"Error" : "Erorr finding test"});

            if(!test)
                return res.json({"Error" : "No test with specified id"});

            test.remove(function(err){
                if(err)
                    return res.json({"Error" : "Error deleting test!"});

                return res.json({"Success" : "Test deleted successfully!"});
            });
        });
    }
};

module.exports = testController;
