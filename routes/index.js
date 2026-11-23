var express = require('express');
var router = express.Router();

/* GET MovieVault homepage */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'Home'
  });
});

module.exports = router;