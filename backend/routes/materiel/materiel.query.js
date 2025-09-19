const getMateriel = `
    SELECT *
    FROM materiel;
`;

const getMaterielById = `
    SELECT *
    FROM materiel
    WHERE id = ?;
`;

module.exports = {
    getMateriel,
    getMaterielById
};
