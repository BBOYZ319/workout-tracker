const db = require('../model/db');

const getLeaderboard = async (req, res) => {
    try {
        const sql = 'SELECT * FROM leaderboards';
        db.query(sql, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.length === 0) {
                return res.status(404).json({ message: 'No leaderboards found' });
            }
            res.json(result);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteLeaderboard = async (req, res) => {
    const { id } = req.params;

    try {
        const sql = 'DELETE FROM leaderboards WHERE id = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Leaderboard entry not found' });
            }
            res.json({ message: 'Leaderboard entry deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getLeaderboard, deleteLeaderboard };
