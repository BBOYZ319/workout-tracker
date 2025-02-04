const db = require('../model/db');

const show = async (req, res) => {
    try {
        const { PIN } = req.params;  

        if (!PIN) {
            return res.status(400).json({ message: 'PIN is required' });
        }

        const sql = 'SELECT * FROM users WHERE PIN = ?';  
        db.query(sql, [PIN], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'Wrong PIN' });
            }
            res.json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const upProfile = async (req, res) => {
    const { username, tempat_tinggal, tanggal_lahir } = req.body;
    const { id } = req.params;

    if ( !username && !tempat_tinggal && !tanggal_lahir) {
        return res.status(400).json({ message: 'At least one of username, tempat_tinggal, or tanggal_lahir is required' });
    }

    try {
        const sql = 'UPDATE users SET  username = COALESCE(?, username), tempat_tinggal = COALESCE(?, tempat_tinggal), tanggal_lahir = COALESCE(?, tanggal_lahir) WHERE id = ?';
        db.query(sql, [username, tempat_tinggal, tanggal_lahir, id], (err, result) => {
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

const deleteProfile = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    try {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'User  not found' });
            }
            res.json({ message: 'User  deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { show, upProfile, deleteProfile };
