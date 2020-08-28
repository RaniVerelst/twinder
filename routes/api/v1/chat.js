const express = require('express');
const router = express.Router();
const chatController = require('../../../controllers/api/v1/chat');

/* api/v1/chat */

router.get("/", chatController.getAll);

router.post("/", chatController.create);

module.exports = router;