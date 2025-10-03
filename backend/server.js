const express = require('express');
const { loggingMiddleware, corsMiddleware } = require('./middleware/middleware.js');
// const authenticateToken = require('./middleware/auth.js');
const routerAuth = require('./routes/auth/auth.js');
// const routerUsers = require('./routes/users/users.js');
const routerMateriel = require('./routes/materiel/materiel.js');
const routerWishlist = require('./routes/wishlist/wishlist.js');
const notFound = require('./middleware/notFound.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);
app.use(corsMiddleware);

// Authentication
app.post('/auth/register', routerAuth);
app.post('/auth/login', routerAuth);

// // Users
// app.get('/users', routerUsers);
// app.get('/users/:userId', routerUsers);
// app.put('/users/:userId', authenticateToken, routerUsers);
// app.patch('/users/:userId', authenticateToken, routerUsers);
// app.patch('/users/:userId/password', authenticateToken, routerUsers)
// app.delete('/users/:userId', authenticateToken, routerUsers);

// Materiel
app.get('/materiel', routerMateriel);
app.get('/materiel/:materielId', routerMateriel);
app.get('/materiel/:materielType', routerMateriel);
app.post('/materiel', routerMateriel);

// WishList
app.get('/wishlist', routerWishlist);
app.get('/wishlist/:wishlistId', routerWishlist);
app.post('/wishlist', routerWishlist);

// 404 Not Found
app.use(notFound);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
