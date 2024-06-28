const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();


router.post('/register', userController.signup);
router.post('/login', userController.login);


router.post('/update/:id', userController.UpdateUserDetails);
router.delete('/delete/:id', userController.deleteUserDetails);

router.get('/signupDetails', userController.getUser);   

// router.get('/getPostUser', userController.getPostUser);

router.post('/VerifyUser', userController.verifyUser);




module.exports = router;


