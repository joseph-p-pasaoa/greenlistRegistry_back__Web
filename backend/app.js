/*
GROUP 4: ARANSA GARCIA, JOSEPH P. PASAOA, KATHY PUMA, AND SERGIO SALAMA
Server App MAIN | Greenlist Registry (a full-stack sustainable material forum app)
*/


/* MODULE INITS */
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());


/* ROUTING */
    // imports
const creatorsRouter = require('./routes/creators');
const resourcersRouter = require('./routes/resourcers');
const productsRouter = require('./routes/products');
const reclaimsRouter = require('./routes/reclaims');
const materialsRouter = require('./routes/materials');
const photosRouter = require('./routes/photos');
const searchRouter = require('./routes/search');
    // connects
app.use('/creators', creatorsRouter);
app.use('/resourcers', resourcersRouter);
app.use('/products', productsRouter);
app.use('/reclaims', reclaimsRouter);
app.use('/materials', materialsRouter);
app.use('/photos', photosRouter);
app.use('/search', searchRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'production') {
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
}


/* ERROR HANDLING */
    // no-route catch
app.use("*", (req, res) => {
    res.status(404).send(
      'error: no such route found on the Greenlist Registry server. Try again after fixing your route.'
    );
});

    // server error catch
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send('Server error. Please try again later.');
});


module.exports = app;
