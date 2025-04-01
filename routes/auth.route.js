const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");

router.post('/signin', async (req, res) => {
    let user = await User.create(req.body);
    res.status(201).json(user);
});

router.post('/login', async (req, res) => {
    let user = await User.findOne({email: req.body.email, password: req.body.password});
    if (!user) {
        return res.status(401).json({message: "Invalid credentials"});
    }
    let token = jwt.sign({id: user._id}, "METTRELAKEYJWT", {expiresIn: '1h'});
    res.status(200).json({token});
});

router.get('/:id',async (req,res) => {
    let user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
});

router.get('/',async (req,res) => {
    let users = await User.find();
    res.status(200).json(users);
});

router.put('/:id',async (req,res) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json(user);
});

router.delete('/:id',async (req,res) => {
    let user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    res.status(200).json({message: "User deleted"});
});



module.exports = router;