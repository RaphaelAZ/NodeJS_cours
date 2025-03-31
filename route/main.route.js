const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authRequired = require('../middleware/auth');

router.get('/', (req,res, next) => {
    res.status(200).send("OK");
})

router.get('/:id', (req,res, next) => { //Placer les routes avec params à la fin éviter les conflitsw
    console.log(req.params.id);
    res.status(200).send("OK");
})

router.post('/details', (req,res, next) => {
    console.log(req.body);
    res.status(201).send("POST OK");
})

router.use(authRequired);

router.post('/login', (req, res, next) => {
    res.status(202).send("Utilisateur habilité");
});

router.post('/signin', (req, res, next) => {
    res.status(200).json(jwt.sign({
        id: 1,
        username: 'Toto'
    }, "mysecretkey123"));
});

module.exports = router;