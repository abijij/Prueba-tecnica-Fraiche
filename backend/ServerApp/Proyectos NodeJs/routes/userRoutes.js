const usersController = require('../controllers/usersController');

const passport = require('passport');


module.exports = (app, upload) => {

    // GET -> OBTENER DATOS
    // POST -> ALMACENAR DATOS
    // PUT -> ACTUALIZAR DATOS
    // DELETE -> ELIMINAR DATOS

    // Rutas para crear, obtener y autenticar usuarios

    /**
     * @swagger
     * /api/users/create:
     *   post:
     *     summary: Crear un nuevo usuario
     *     description: Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud
     *     tags:
     *       - Usuarios
     *     parameters:
     *       - in: body
     *         name: user
     *         description: Datos del usuario a crear
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         description: Id del usuario creado
     *         schema:
     *           type: integer
     *       400:
     *         description: Error al crear el usuario
     */

    app.post('/api/users/create', usersController.register);
    /**
     * @swagger
     * /api/users/createWithImage:
     *   post:
     *     summary: Crear un nuevo usuario con imagen
     *     description: Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud y una imagen adjunta
     *     tags:
     *       - Usuarios
     *     consumes:
     *       - multipart/form-data
     *     parameters:
     *       - in: formData
     *         name: image
     *         type: file
     *         description: Imagen del usuario
     *       - in: body
     *         name: user
     *         description: Datos del usuario a crear
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         description: Id del usuario creado
     *         schema:
     *           type: integer
     *       400:
     *         description: Error al crear el usuario
     */
    app.post('/api/users/createWithImage', upload.array('image', 1), usersController.registerWithImage);

    /**
     * @swagger
     * /api/users/createWithImage:
     *   post:
     *     summary: Crear un nuevo usuario con imagen
     *     description: Crea un nuevo usuario con los datos proporcionados en el cuerpo de la solicitud y una imagen adjunta
     *     tags:
     *       - Usuarios
     *     consumes:
     *       - multipart/form-data
     *     parameters:
     *       - in: formData
     *         name: image
     *         type: file
     *         description: Imagen del usuario
     *       - in: body
     *         name: user
     *         description: Datos del usuario a crear
     *         schema:
     *           $ref: '#/definitions/User'
     *     responses:
     *       200:
     *         description: Id del usuario creado
     *         schema:
     *           type: integer
     *       400:
     *         description: Error al crear el usuario
     */
    app.get('/api/users/findDeliveryMen', passport.authenticate('jwt', { session: false }), usersController.findDeliveryMen);

    app.get('/api/users/findClient', passport.authenticate('jwt', { session: false }), usersController.findClient);

    app.get('/api/users/findAdmin', passport.authenticate('jwt', { session: false }), usersController.findAdmin);

    app.post('/api/users/login', usersController.login);

    // app.post('/api/users/pinVerify', usersController.pinVerify);  //Generación de la ruta para validar el PIN enviado por el ingresado por el usuario --Edgar


    //401 UNAUTHOTIAZED
    app.put('/api/users/update', passport.authenticate('jwt', { session: false }), upload.array('image', 1), usersController.updateWithImage);
    
    app.put('/api/users/updateWhithoutImage', passport.authenticate('jwt', { session: false }), usersController.updateWhithoutImage);

    app.put('/api/users/updateNotificationToken', passport.authenticate('jwt', { session: false }), usersController.updateNotificationToken);

    app.put('/api/users/updateVerifyStatus', passport.authenticate('jwt', { session: false }), usersController.updateVerifyStatus);

    app.put('/api/users/updatePermissionsStatus', passport.authenticate('jwt', { session: false }), usersController.updatePermissionsStatus);

    app.get('/api/users/getFavoriteProductsByUserId/:id', passport.authenticate('jwt', { session: false }), usersController.getFavoriteProductsByUserId);

    app.delete('/api/users/delete/:id', passport.authenticate('jwt', {session:  false}), usersController.delete);
}