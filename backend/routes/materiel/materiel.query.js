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

module.exports = {
    getMateriel,
    getMaterielById,
    getMaterielByType
};
