const express = require('express');
const bodyParser = require('body-parser');
const searchRoutes = require('./routes/searchRoutes');
const favouriteRoutes = require('./routes/favouriteRoutes');

const app = express();

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/search', searchRoutes);
app.use('/favourites', favouriteRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
