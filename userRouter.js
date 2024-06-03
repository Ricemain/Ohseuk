const express = require('express');
const regionRouter = require('./search');
const router = express.Router();

router.get('/getRegion', (req, res) => {
    regionRouter.getRegion().then((result) => {
        res.json(result);
    });

});

module.exports = router;