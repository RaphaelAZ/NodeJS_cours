const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");

router.post('/signin', async (req, res) => {
    try {
        let user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de l'inscription"});
    }
});

router.post('/login', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({message: "Email et mot de passe sont requis"});
        }
        let user = await User.findOne({email: req.body.email, password: req.body.password});

        if (!user) {
            return res.status(401).json({message: "Identifiants incorrects"});
        }
        let token = jwt.sign({id: user._id}, "ENV_SECRETKEY");
        res.status(200).json({token});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Erreur interne"});
    }
});

router.get('/:id',async (req,res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: "L'ID est requis"});
        }
        let user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({message: "Utilisateur introuvable"});
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur interne"});
    }
});

router.get('/',async (req,res) => {
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur interne"});
    }
});

router.put('/:id',async (req,res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: "L'ID est requis"});
        }
        if (!req.body) {
            return res.status(400).json({message: "Les données sont requises"});
        }
        let user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Erreur interne"});
    }
    
});

router.delete('/:id',async (req,res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: "L'ID est requis"});
        }
        if (!req.body) {
            return res.status(400).json({message: "Les données sont requises"});
        }
        let user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({message: "Utilisateur introuvable"});
        }
        res.status(200).json({message: "Utilisateur supprimé"});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Erreur interne"});
    }
});



module.exports = router;