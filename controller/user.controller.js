const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");
require("dotenv").config();

exports.signin = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) return res.status(400).json({message: "Email et mot de passe sont requis"});
        let user = await User.create({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({message: "Erreur lors de l'inscription"});
    }
}

exports.login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({message: "Email et mot de passe sont requis"});
        }
        let user = await User.findOne({
            email: req.body.email, 
            password: bcrypt.hashSync(req.body.password, 10)
        });

        if (!user) {
            return res.status(401).json({message: "Identifiants incorrects"});
        }
        let token = jwt.sign({id: user._id}, process.env.SECRET_JWT_KEY, {expiresIn: '1h'});
        res.status(200).json({token});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Erreur interne"});
    }
}

exports.getAll = async (req,res) => {
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Erreur interne"});
    }
}

exports.getById = async (req,res) => {
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
}

exports.updateUser = async (req,res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: "L'ID est requis"});
        }
        if (!req.body || !req.body.email || !req.body.password) {
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
    
}

exports.deleteUser = async (req,res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({message: "L'ID est requis"});
        }
        if (!req.body || !req.body.email || !req.body.password) {
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
}