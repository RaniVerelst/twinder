const getAll = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "chat": []
        }
    });
}

const create = (req, res) => {
    res.json({
        "status": "success",
        "data": {
            "chat": {
                "text": "First message"
            }
        }
    });
}

module.exports.getAll = getAll;
module.exports.create = create;