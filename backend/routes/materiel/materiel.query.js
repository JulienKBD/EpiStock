const getMateriel = `
    SELECT *
    FROM materiel;
`;

const getMaterielById = `
    SELECT *
    FROM materiel
    WHERE id = ?;
`;

const getMaterielByType = `
    SELECT *
    FROM materiel
    WHERE type = ?;
`;

const createMateriel = `
    INSERT INTO materiel (name, type, numero_serie, marque, valeur, etat, emplacement, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?);
`

const getStats = `
    SELECT
        SUM(CASE WHEN type = 'Ordinateur' THEN 1 ELSE 0 END) AS ordinateurs,
        SUM(CASE WHEN type = 'Câble' THEN 1 ELSE 0 END) AS cables,
        SUM(CASE WHEN type = 'Écran' THEN 1 ELSE 0 END) AS moniteurs,
        COUNT(*) AS total
    FROM materiel;
`;

module.exports = {
    getMateriel,
    getMaterielById,
    getMaterielByType,
    createMateriel,
    getStats
};
