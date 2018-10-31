const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

/* GET home page. */
router.get('/', function(req, res) {
  res.send('you shall not pass')
  // res.render('index', { title: 'Express' });
});

router.post('/',registerController.register);

module.exports = router;
