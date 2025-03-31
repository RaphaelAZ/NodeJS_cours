const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authRequired = require('../middleware/auth');
const User = require('../model/user.model');

router.get('/', (req,res) => {
    let users = User.find({});
    console.log(users);
    res.status(200).send(users);
});

router.post('/login', async (req, res) => {
    let user = await User.findOne({username: req.body.username, password: req.body.password});
    if (user) {
        res.status(200).json(jwt.sign({
            id: user._id,
            username: user.username
        }, "mysecretkey123"));
    } else {
        return res.status(401).json({ message: 'Identifiants incorrects' });
    }
});

router.get('/:id', async (req,res) => {
    let user = await User.findOne({_id: req.params.id});
    console.log(user);
    res.status(200).send(user);
});

router.put('/:id', async (req,res) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body);
    console.log(user);
    res.status(200).send(user);
});

router.delete('/:id', async (req,res) => {
    let user = await User.deleteOne({_id: req.params.id});
    console.log(user);
    res.status(200).send(user);
});

router.post('/signin', async (req, res) => {
    let user = await User.create(req.body);
    res.status(201).send(user);
});

// router.post('/details', (req,res, next) => {
//     console.log(req.body);
//     res.status(201).send("POST OK");
// });

// router.use(authRequired);

module.exports = router;