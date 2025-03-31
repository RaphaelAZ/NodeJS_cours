const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json('test');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    res.status(200).json(`ceci est le produit numéro ${id} !`);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.status(201);
    res.send("created !");
});

module.exports = router;