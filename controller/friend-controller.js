const db = require('../model/db');

const addFriend = async (req, res) => {
    const { userId, username } = req.body;

    if (!userId || !username) {
        return res.status(400).json({ message: 'User ID and username are required' });
    }

    try {
        const sql = 'INSERT INTO friend (id, username) VALUES (?, ?)';
        db.query(sql, [userId, username], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ 
                message: 'Friend added successfully', 
                id: result.insertId, 
                username: username 
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteFriend = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Friend ID is required' });
    }

    try {
        const sql = 'DELETE FROM friend WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Friend not found' });
            }
            res.json({ message: 'Friend deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const showFriends = async (req, res) => {
    try {
        const sql = 'SELECT * FROM friend';
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const searchFriendByUsername = async (req, res) => {
    const { username } = req.params;

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const sql = 'SELECT id, username FROM users WHERE username = ? LIMIT 1';
        db.query(sql, [username], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(result[0]); 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addFriend, deleteFriend, showFriends, searchFriendByUsername };
