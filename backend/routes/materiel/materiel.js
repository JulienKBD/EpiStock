const express = require('express');
const pool = require('../../config/db.js');
const router = express.Router();
const { getMateriel, getMaterielById, getMaterielByType } = require('./materiel.query.js');

router.get('/materiel', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(getMateriel);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Aucun matériel.' });
        }

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération du matériel.' });
    } finally {
        if (conn) conn.release();
    }
});

router.get('/materiel/:materielId', async (req, res) => {
    const { materielId } = req.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(getMaterielById, [materielId]);

        if (rows.length === 0) {
        return res.status(404).json({ error: 'Matériel non trouvé.' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération du matériel.' });
    } finally {
        if (conn) conn.release();
    }
});

router.get('/materiel/:materielType', async (req, res) => {
    const { materielType } = req.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(getMaterielByType, [materielType]);

        if (rows.length === 0) {
        return res.status(404).json({ error: 'Aucun materiel de ce type trouvé.' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération du matériel.' });
    } finally {
        if (conn) conn.release();
    }
});

module.exports = router;
