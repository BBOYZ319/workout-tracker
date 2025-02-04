const db = require('../model/db');
const bcrypt = require('bcrypt'); 
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); 
const fs = require('fs'); 
const crypto = require('crypto'); 

dotenv.config(); 


const register = async (req, res) => {
    const { username, password, PIN, tanggal_lahir, tempat_tinggal } = req.body;

    if (!username || !password || !PIN || !tanggal_lahir || !tempat_tinggal) {
        return res.status(400).json({ message: 'Username, password, PIN, tanggal_lahir, dan tempat_tinggal diperlukan' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO users (username, password, PIN, tanggal_lahir, tempat_tinggal) VALUES (?, ?, ?, ?, ?)';
        
        db.query(sql, [username, hashedPassword, PIN, tanggal_lahir, tempat_tinggal], (err, result) => {
            if (err) {
                console.error(err); 
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User  registered successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const login = async (req,res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const sql = 'SELECT * FROM users WHERE username = ?';
    
    db.query(sql, [username], async (err, result) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        
        if (result.length > 0) {
            const user = result[0]; 
            const isPasswordValid = await bcrypt.compare(password, user.password); 
            
            if (isPasswordValid) {
                const secretKey = process.env.JWT_SECRET || crypto.randomBytes(64).toString('hex');

                
                if (!process.env.JWT_SECRET) {
                    fs.appendFile('.env', `JWT_SECRET=${secretKey}\n`, (err) => {
                        if (err) {
                            console.error('Error writing to .env file', err);
                            return res.status(500).json({ message: 'Internal Server Error' });
                        }
                    });
                }

                const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
                res.json({ token }); 
            } else {
                res.status(401).json({ message: 'Invalid credentials' }); 
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' }); 
        }
    });
};

const protected = async (req,res) => {
    res.json({ message: 'This is a protected route', user: req.user });
};

module.exports={register,login,protected};
