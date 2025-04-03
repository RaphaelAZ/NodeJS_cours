const express = require("express");
const router = express.Router();
const userController = require("./../controller/user.controller.js");

router.post('/signin', userController.signin);

router.post('/login', userController.login);

router.get('/:id', userController.getById);

router.get('/', userController.getAll);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);



module.exports = router;