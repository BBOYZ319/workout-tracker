const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


dotenv.config();


const authenticateJWT = (req, res, next) => {
   
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; 

    if (token) {
     
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => { 
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid token' }); 
            }
            req.user = user; 
            next(); 
        });
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' }); 
    }
};

module.exports = authenticateJWT;