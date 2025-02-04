const db = require('../model/db');

const addAct = async (req, res) => {
    const { name, target } = req.body;
    const date = req.body.date || new Date().toISOString().split('T')[0]; 

    if (!name || !target) {
        return res.status(400).json({ message: 'Name and target are required' });
    }

    try {
        const sql = 'INSERT INTO activities (name, date, target) VALUES (?, ?, ?)';
        db.query(sql, [name, date, target], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Activity added successfully', id: result.insertId });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const upAct = async (req, res) => {
    const { name, target } = req.body;
    const date = req.body.date || new Date().toISOString().split('T')[0]; 
    const { id } = req.params;

    if (!name && !target && !date) {
        return res.status(400).json({ message: 'At least one of name, date, or target is required' });
    }

    try {
        const sql = 'UPDATE activities SET name = COALESCE(?, name), date = COALESCE(?, date), target = COALESCE(?, target) WHERE id = ?';
        db.query(sql, [name, date, target, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Activity not found' });
            }
            res.json({ message: 'Activity updated successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const delAct = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = 'DELETE FROM activities WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Activity not found' });
            }
            res.json({ message: 'Activity deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const show = async (req, res) => {
    try {
        const sql = 'SELECT * FROM activities';
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

const addToLeaderboard = async (req, res) => {
    const { username } = req.body;
    const date = new Date().toISOString().split('T')[0]; 

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    try {
        const countSql = 'SELECT COUNT(*) AS activityCount FROM activities';
        db.query(countSql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }

            const score = result[0].activityCount; 

            const sql = 'INSERT INTO leaderboards (username, date, score) VALUES (?, ?, ?)';
            db.query(sql, [username, date, score], (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }
                res.status(201).json({ message: 'Leaderboard updated successfully', id: result.insertId });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addAct, upAct, delAct, show, addToLeaderboard };
