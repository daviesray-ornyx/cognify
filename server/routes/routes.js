var express = require('express');
var router = express.Router();


var mainController = require('../controllers/mainController');
var userController = require('../controllers/userController');
var testController = require('../controllers/testController');


/* GET users listing. */
router.get('/',mainController.home);

// user routes
router.get('/users',userController.list);
router.get('/users/:id',userController.find);
router.post('/users/login',userController.login);
router.get('/users/logout',userController.logout);
router.post('/users', userController.register);
router.post('/users/updateScore', userController.updateScore);
router.delete('/users/:id', userController.delete);
    //-- end of user routes

// test routes
router.get('/tests', testController.list);
router.post('/tests/getNextTest', testController.getNextTest);
router.post('/tests', testController.create);
router.put('/tests/:id', testController.edit);
router.delete('/tests/:id', testController.delete);
    //-- end of test routes

module.exports = router;
