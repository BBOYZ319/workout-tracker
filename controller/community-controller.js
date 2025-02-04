const db = require('../model/db');

const addCommunity = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }

    try {
        const tanggal_dibuat = new Date();
        const sql = 'INSERT INTO community (name, description, tanggal_dibuat) VALUES (?, ?, ?)';
        db.query(sql, [name, description, tanggal_dibuat], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ 
                message: 'Community added successfully', 
                id: result.insertId, 
                tanggal_dibuatt: tanggal_dibuat
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const updateCommunity = async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.params;

    if (!name && !description) {
        return res.status(400).json({ message: 'At least one of name or description is required' });
    }

    try {
        const sql = 'UPDATE community SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?';
        db.query(sql, [name, description, id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Community not found' });
            }
            res.json({ message: 'Community updated successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteCommunity = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = 'DELETE FROM community WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Community not found' });
            }
            res.json({ message: 'Community deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const showCommunities = async (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({ message: 'Name query parameter is required' });
    }

    try {
        const sql = 'SELECT * FROM community WHERE name = ?';
        db.query(sql, [name], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Community not found' });
            }
            res.json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



const show = async (req, res) => {
    try {
        const sql = 'SELECT * FROM community';
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'No activities found' });
            }
            res.json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { addCommunity, updateCommunity, deleteCommunity, showCommunities,show };