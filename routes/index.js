var express = require('express');
var router = express.Router();
var chatController = require('../controllers/api/v1/chat');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/birthday/:birthday", chatController.detailPage);


module.exports = router;
