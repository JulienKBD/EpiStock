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

module.exports = {
    getMateriel,
    getMaterielById,
    getMaterielByType,
    createMateriel
};
