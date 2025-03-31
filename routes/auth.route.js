const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");

router.post('/signin', async (req, res) => {
    let user = await User.create(req.body);
    res.status(201).json(user);
});

router.post('/login', (req, res) => {
    res.status(200).json(jwt.sign({
        firstName: 'John',
        lastName: 'Elden Ring'
    }, "iohnhfviuzrenbé415196zakfdsvi"));
});

router.get('/:id',async (req,res) => {
    let user = await User.findOne({_id: req.params.id});
    res.status(200).json(user);
});

router.get('/',async (req,res) => {

});

router.put('/:id',async (req,res) => {
    
});

router.delete('/:id',async (req,res) => {
    
});



module.exports = router;