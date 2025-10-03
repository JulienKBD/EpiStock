const getWishlist = `
    SELECT *
    FROM wishlist;
`;

const getWishlistById = `
    SELECT *
    FROM wishlist
    WHERE id = ?;
`;

const createWishList = `
    INSERT INTO wishlist (name, marque, valeur, image_url)
    VALUES (?, ?, ?, ?);
`;

module.exports = {
    getWishlist,
    getWishlistById,
    createWishList
};
