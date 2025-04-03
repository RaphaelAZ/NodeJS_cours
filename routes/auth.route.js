const express = require("express");
const router = express.Router();
const userController = require('./../controller/user.controller.js');
const authMiddleware = require("../middleware/auth.middleware.js");
const {upload} = require("../middleware/multer.middleware.js");

router.post('/signin', userController.signin);
router.post('/login', userController.login);
router.get('/:id',userController.getById);
router.get('/',userController.getAll);
router.put('/',authMiddleware("Member"),upload('avatar'), userController.update);
router.put('/:id',authMiddleware("Admin"),userController.updateAdmin);
router.delete('/:id',userController.delete);

module.exports = router;