const express = require('express');
const pool = require('../../config/db.js');
const router = express.Router();
const { getMateriel, getMaterielById, getMaterielByType, createMateriel } = require('./materiel.query.js');

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

router.post('/materiel', async (req, res) => {
    const { name, type, numeroSerie, marque, valeur, etat, emplacement, image_url } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query(createMateriel, [name, type, numeroSerie, marque, valeur, etat, emplacement, image_url]);

        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l’ajout du matériel.' });
    } finally {
        if (conn) conn.release();
    }
});

module.exports = router;
