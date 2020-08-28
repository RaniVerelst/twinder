const Chat = require('../../../models/chat');

const getAll = (req, res) => {
    Chat.find({ "user": "Joris" }, (err, docs) => {
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "chat": docs
                }
            });
        }
    });
}

const create = (req, res) => {
    let chat = new Chat();
    chat.text = req.body.text;
    chat.user = req.body.user;
    chat.read = req.body.read;
    chat.save((err, doc) => {
        if (err) {
            res.json({
                "status": "error",
                "message": "Could not send this message"
            })
        }
        if (!err) {
            res.json({
                "status": "success",
                "data": {
                    "chat": doc
                }
            });
        }
    })


}

module.exports.getAll = getAll;
module.exports.create = create;