const jwt = require('jsonwebtoken');
const moment = require('moment');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path: path.join(__dirname, '../.env')});

const generateSuperAdminToken = () => {
    const payload = {
        sub: 'RF-Plans',
        iat: moment().unix(),
        type: 'ACCESS_TOKEN',
        isSuperAdmin: true,
        username: 'rf-plans-super-admin',
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

let signToken = generateSuperAdminToken();
console.log(signToken);

let unSignToken = verifyToken(signToken);
console.log(unSignToken);