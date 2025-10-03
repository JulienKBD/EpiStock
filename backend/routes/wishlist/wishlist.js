const express = require('express');
const pool = require('../../config/db.js');
const router = express.Router();
const { getWishlist, getWishlistById, createWishList } = require('./wishlist.query.js');

router.get('/wishlist', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(getWishlist);

        if (rows.length === 0) {
            return res.status(201).json({ error: 'Aucun matériel.' });
        }

        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de la récupération du matériel.' });
    } finally {
        if (conn) conn.release();
    }
});

router.get('/wishlist/:wishlistId', async (req, res) => {
    const { wishlistId } = req.params;
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(getWishlistById, [wishlistId]);

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

router.post('/wishlist', async (req, res) => {
    const { name, marque, valeur, image_url } = req.body;
    let conn;
    try {
        conn = await pool.getConnection();
    const result = await conn.query(createWishList, [name, marque, valeur, image_url]);
    const insertedId = typeof result.insertId === 'bigint' ? Number(result.insertId) : result.insertId;
    res.status(201).json({ id: insertedId, ...req.body });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erreur lors de l’ajout du matériel.' });
    } finally {
        if (conn) conn.release();
    }
});

module.exports = router;
