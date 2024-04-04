const productsController = require ('../controllers/productsController');
const passport = require ('passport');

module.exports = (app, upload) => {


    app.post('/api/products/create', passport.authenticate('jwt', {session:  false}), upload.array('image', 3), productsController.create);

    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', {session:  false}), productsController.findByCategory);
    
    app.get('/api/products/findByCategoryPagination/:id_category/:page', passport.authenticate('jwt', {session:  false}), productsController.findByCategoryPagination);

    app.delete('/api/products/delete/:id', passport.authenticate('jwt', {session:  false}), productsController.delete);
   
    app.put('/api/products/updateWihtImage', passport.authenticate('jwt', {session:  false}), upload.array('image', 3), productsController.updateWihtImage);

    app.put('/api/products/updateWihtImage3', passport.authenticate('jwt', {session:  false}), upload.array('image', 1), productsController.updateWihtImage3);

    app.put('/api/products/updateWihtImage2', passport.authenticate('jwt', {session:  false}), upload.array('image', 1), productsController.updateWihtImage2);

    app.put('/api/products/updateWihtImage1', passport.authenticate('jwt', {session:  false}), upload.array('image', 1), productsController.updateWihtImage1);

    app.put('/api/products/updateWihtImage1and2', passport.authenticate('jwt', {session:  false}), upload.array('image', 2), productsController.updateWihtImage1and2);

    app.put('/api/products/updateWihtImage1and3', passport.authenticate('jwt', {session:  false}), upload.array('image', 2), productsController.updateWihtImage1and3);

    app.put('/api/products/updateWihtImage2and3', passport.authenticate('jwt', {session:  false}), upload.array('image', 2), productsController.updateWihtImage2and3);

    app.put('/api/products/update', passport.authenticate('jwt', {session:  false}), productsController.update);

    app.put('/api/products/updateStock', passport.authenticate('jwt', {session:  false}), productsController.updateStock);

    app.get('/api/products/searchByName/:name', passport.authenticate('jwt', {session:  false}), productsController.searchByName);

    app.get('/api/products/findById/:id', passport.authenticate('jwt', { session: false }), productsController.findById);

    app.get('/api/products/findTotalProductsByCategory/:category_id', passport.authenticate('jwt', {session:  false}), productsController.findTotalProductsByCategory);
   
    

}