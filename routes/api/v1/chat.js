const express = require('express');
const router = express.Router();

/* api/v1/chat */

router.get("/", (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "chat": []
        }
    });
});

router.post("/", (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "chat": {
                "text": "First message"
            }
        }
    });
});

module.exports = router;