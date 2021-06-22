const { v4: uuidV4 } = require('uuid');

const uniqueId = (req, res, next) => {
    req.uuid = uuidV4();
    console.log(req.uuid);
    next();
};

module.exports = uniqueId;