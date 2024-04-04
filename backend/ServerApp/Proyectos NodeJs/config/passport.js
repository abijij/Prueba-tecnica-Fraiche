
/**
 * Este módulo define una estrategia de autenticación de Passport.js utilizando JSON Web Tokens (JWT). 
 *
 * @module passport-jwt-strategy
 */
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Keys = require('./keys');
const User = require('../models/user');



/**
 * Define una estrategia de autenticación de Passport.js utilizando JSON Web Tokens (JWT).
 *
 * @param {Object} passport - Instancia de Passport.js que se utiliza para configurar la estrategia.
 */
module.exports = (passport) => {

    /**
     * Opciones de configuración para la estrategia de autenticación.
     *
     * @typedef {Object} JwtStrategyOptions
     * @property {Function} jwtFromRequest - Función que se utiliza para extraer el token JWT de la solicitud.
     * @property {string} secretOrKey - Clave secreta utilizada para verificar la firma del token JWT.
     */

    /** @type {JwtStrategyOptions} */


    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = Keys.secretOrKey;
    /**
     * Callback que se ejecuta cuando se valida un token JWT.
     *
     * @callback JwtVerifyCallback
     * @param {Error} err - Objeto de error en caso de que ocurra algún problema en la validación.
     * @param {Object|boolean} user - Objeto que representa al usuario autenticado, o `false` si no se pudo autenticar.
     */

    /**
     * Definición de la estrategia de autenticación.
     *
     * @type {JwtStrategy}
     */

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    
        User.findById(jwt_payload.id, (err, user) => {
             // Busca el usuario correspondiente al ID del usuario que se encuentra en el token JWT.
            if (err) {
                return done(err, false);// Error al buscar el usuario en la base de datos.
            }
            if (user) {
                return done(null, user);// Usuario encontrado y autenticado con éxito.
            }
            else {
                return done(null, false);// Usuario no encontrado o no autenticado con éxito.
            }

        });

    }));

}