

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const storage = require('../utils/cloud_storage');
const Rol = require('../models/roles')





module.exports = {

    findDeliveryMen(req, res) {
        User.findDeliveryMen((err, data) => {



            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la obtencion del delivery',
                    error: err
                });
            }

            return res.status(201).json(data);

        });
    },

    findClient(req, res) {
        User.findClient((err, data) => {



            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la obtencion del cliente',
                    error: err
                });
            }

            return res.status(201).json(data);

        });
    },

    findAdmin(req, res) {
        User.findAdmin((err, data) => {



            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la obtencion del admin',
                    error: err
                });
            }

            return res.status(201).json(data);

        });
    },



  

    login(req, res) {

      
        const email = req.body.email;
        const password = req.body.password;

        User.findByEmail(email, async (err, myUser) => {

            console.log('Error ', err);
            console.log('USUARIO ', myUser);

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            // Si el usuario no existe, enviamos una respuesta con estado 401 (No autorizado)
            if (!myUser) {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'El email no fue encontrado'
                });
            }

            // Comparamos la contraseña proporcionada por el usuario con la contraseña almacenada en la base de datos
            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            // Si la contraseña es válida, creamos un token de sesión y enviamos una respuesta con estado 201 (Creado)  
            if (isPasswordValid) {
                const token = jwt.sign({ id: myUser.id, email: myUser.email }, keys.secretOrKey, {});

                const data = {
                    id: `${myUser.id}`,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    email: myUser.email,
                    phone: myUser.phone,
                    image: myUser.image,
                    session_token: `JWT ${token}`,
                    roles: myUser.roles,
                    verify: myUser.verify,
                    permissions: myUser.permissions,
                }

                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data // EL ID DEL NUEVO USUARIO QUE SE REGISTRO
                });

            }
            // Si la contraseña es inválida, enviamos una respuesta con estado 401 (No autorizado)
            else {
                return res.status(401).json({ // EL CLIENTE NO TIENE AUTORIZACION PARTA REALIZAR ESTA PETICION (401)
                    success: false,
                    message: 'La contraseña es incorrecta'
                });
            }

        });

    },

    




    register(req, res) {
        const user = req.body;

        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: data
            });

          
        });
    },








 

    async registerWithImage(req, res) {

        const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        
        User.create(user, (err, data) => {


            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }

            user.id = `${data}`;
            const token = jwt.sign({ id: user.id, email: user.email }, keys.secretOrKey, {});
            user.session_token = `JWT ${token}`;

            Rol.create(user.id, 1, (err, data) => {

                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del rol del usuario',
                        error: err
                    });
                }



                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: user
                });


            });

            

        });

    },

    async updateWithImage(req, res) {

        const user = JSON.parse(req.body.user); // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if (url != undefined && url != null) {
                user.image = url;
            }
        }

        User.update(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'La información se actualizo correctamente',
                data: user
            });


        });

    },

    async updateWhithoutImage(req, res) {

        const user = req.body; // CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE

        User.updateWhithoutImage(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'La información se actualizo correctamente',
                data: user
            });


        });

    },

    async updateNotificationToken(req, res) {

        const id = req.body.id;
        const token = req.body.token;
        console.log('Id: ', id);
        console.log('Token: ', token);

        User.updateNotificationToken(id, token, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro del usuario',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'El token se actualizo correctamente',
                data: id
            });


        });

    },


  

    async updateVerifyStatus(req, res) {
        const id = req.body.id;
        User.updateVerifyStatus(id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Hubo un error al actualizar el estado de verificación del usuario',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Se actualizó el estado de verificación del usuario correctamente',
                data: id
            });
        });
    },

    async updatePermissionsStatus(req, res) {
        const id = req.body.id;
        User.updatePermissionsStatus(id, (err, data) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Hubo un error al actualizar el estado de permissions del usuario',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Se actualizó el estado de permissions del usuario correctamente',
                data: id
            });
        });
    },



    async getFavoriteProductsByUserId(req, res) {

        const id = req.params.id;

        User.getFavoriteProductsByUserId(id, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los productos favoritos',
                    error: err
                });
            }

            return res.status(201).json(data);

        });
    },



    delete(req, res) {

        const id = req.params.id;

        User.delete(id, (err, id) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de eliminar la cuenta',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'La cuenta se eliminó correctamente',
                data: `${id}`
            });

        });
    },

}