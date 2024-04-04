const db = require('../config/config');
const bcrypt = require('bcryptjs');
const { use } = require('passport');



const User = {};

User.findById = (id, result) => {

    const sql = `
    SELECT
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.image,
            U.phone,
            U.password,
            U.verify,
            U.permissions,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
         ) AS roles 
            
        FROM
            users AS U
        INNER JOIN  
            user_has_roles AS UHR
        ON
            UHR.id_user = U.id
        INNER JOIN 
            roles AS R
        ON
            UHR.id_rol = R.id
        WHERE
            U.id = ?
        GROUP BY
            U.id        
    `;

    db.query(
        sql,
        [id],
        (err, user) => {
            if (err) {
                if (err.fatal) {
                    console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                    console.log('Error:', err);
                    db.destroy(); // Eliminar la conexión envenenada del grupo
                }
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}


User.findDeliveryMen = (result) => {

    const sql = `
                SELECT
                    CONVERT(U.id, char) AS id,
                    U.email,
                    U.name,
                    U.lastname,
                    U.image,
                    U.phone,
                    U.token_notification
                FROM
                    users AS U
                INNER JOIN
                    user_has_roles as UHR
                ON
                    UHR.id_user = U.id
                INNER JOIN 
                    roles AS R
                ON
                    R.id = UHR.id_rol
                WHERE
                    R.id = 2;
                    `;
    db.query(
        sql,
        (err, data) => {
            if (err) {
                if (err.fatal) {
                    console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                    console.log('Error:', err);
                    db.destroy(); // Eliminar la conexión envenenada del grupo
                }
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Delivey obtenido:', data);
                result(null, data);
            }
        }
    );
}

User.findClient = (result) => {

    const sql = `
                SELECT
                    CONVERT(U.id, char) AS id,
                    U.email,
                    U.name,
                    U.lastname,
                    U.image,
                    U.phone,
                    U.token_notification
                FROM
                    users AS U
                INNER JOIN
                    user_has_roles as UHR
                ON
                    UHR.id_user = U.id
                INNER JOIN 
                    roles AS R
                ON
                    R.id = UHR.id_rol
                WHERE
                    R.id = 3;
                    `;
    db.query(
        sql,
        (err, data) => {
            if (err) {
                if (err.fatal) {
                    console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                    console.log('Error:', err);
                    db.destroy(); // Eliminar la conexión envenenada del grupo
                }
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Delivey obtenido:', data);
                result(null, data);
            }
        }
    );
}


User.findAdmin = (result) => {

    const sql = `
                SELECT
                    CONVERT(U.id, char) AS id,
                    U.email,
                    U.name,
                    U.lastname,
                    U.image,
                    U.phone,
                    U.token_notification
                FROM
                    users AS U
                INNER JOIN
                    user_has_roles as UHR
                ON
                    UHR.id_user = U.id
                INNER JOIN 
                    roles AS R
                ON
                    R.id = UHR.id_rol
                WHERE
                    R.id = 1;
                    `;
    db.query(
        sql,
        (err, data) => {
            if (err) {
                if (err.fatal) {
                    console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                    console.log('Error:', err);
                    db.destroy(); // Eliminar la conexión envenenada del grupo
                }
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Admin obtenido:', data);
                result(null, data);
            }
        }
    );
}


User.findByEmail = (email, result) => {

    const sql = `
        SELECT
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.image,
            U.phone,
            U.password,
            U.verify,
            U.permissions,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
         ) AS roles 
            
        FROM
            users AS U
        INNER JOIN  
            user_has_roles AS UHR
        ON
            UHR.id_user = U.id
        INNER JOIN 
            roles AS R
        ON
            UHR.id_rol = R.id
        WHERE
            email = ?
        GROUP BY
            U.id        
    `;

    db.query(
        sql,
        [email],
        (err, user) => {
            if (err) {
                if (err.fatal) {
                    console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                    console.log('Error:', err);
                    db.destroy(); // Eliminar la conexión envenenada del grupo
                }
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}


User.findByPhone = (phone, result) => {

    const sql = `
        SELECT
            U.id,
            U.email,
            U.name,
            U.lastname,
            U.image,
            U.phone,
            U.password,
            U.verify,
            U.permissions,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'id', CONVERT(R.id, char),
                'name', R.name,
                'image', R.image,
                'route', R.route
            )
         ) AS roles 
            
        FROM
            users AS U
        INNER JOIN  
            user_has_roles AS UHR
        ON
            UHR.id_user = U.id
        INNER JOIN 
            roles AS R
        ON
            UHR.id_rol = R.id
        WHERE
            phone = ?
        GROUP BY
            U.id        
    `;

    db.query(
        sql,
        [phone],
        (err, user) => {
            if (err) {
                if (err.fatal) {
                    console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                    console.log('Error:', err);
                    db.destroy(); // Eliminar la conexión envenenada del grupo
                }
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )

}





User.create = async (user, result) => {

    const hash = await bcrypt.hash(user.password, 10);

    
    const sql = `
        INSERT INTO
            users(
                email,
                name,
                lastname,
                phone,
                image,
                password,
                created_at,
                updated_at,
                verify,
                permissions
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    // Ejecuta la consulta SQL con los valores del usuario y el hash de la contraseña como parámetros.
    db.query
        (
            sql,
            [
                user.email,
                user.name,
                user.lastname,
                user.phone,
                user.image,
                hash,
                new Date(),
                new Date(),
                user.verify,
                user.permissions
            ],
            (err, res) => {
                if (err) {
                    // Si la consulta no se ejecuta correctamente, invoca la función de devolución de llamada con un objeto `Error` como primer argumento y `null` como segundo argumento
                    if (err.fatal) {
                        console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                        console.log('Error:', err);
                        db.destroy(); // Eliminar la conexión envenenada del grupo
                    }
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    // Si la consulta se ejecuta correctamente, invoca la función de devolución de llamada con `null` como primer argumento y el ID del nuevo usuario como segundo argumento.
                    console.log('Id del nuevo usuario:', res.insertId);
                    result(null, res.insertId);
                }
            }
        )

}





User.updateWhithoutImage = (user, result) => {

    const sql = `
    UPDATE
        users
    SET
        name = ?,
        lastname = ?,
        phone = ?,
        updated_at = ?
    WHERE
        id = ?
    `;
    db.query
        (
            sql,
            [
                //Siempre llevar el roden que se especificaron en los parametros
                user.name,
                user.lastname,
                user.phone,
                new Date(),
                user.id
            ],
            (err, res) => {
                if (err) {
                    // Si la consulta no se ejecuta correctamente, invoca la función de devolución de llamada con un objeto `Error` como primer argumento y `null` como segundo argumento
                    if (err.fatal) {
                        console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                        console.log('Error:', err);
                        db.destroy(); // Eliminar la conexión envenenada del grupo
                    }
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    // Si la consulta se ejecuta correctamente, invoca la función de devolución de llamada con `null` como primer argumento y el ID del nuevo usuario como segundo argumento.
                    console.log('Usuario Actualizado:', user.id);
                    result(null, user.id);
                }
            }
        )
}

User.update = (user, result) => {

    const sql = `
    UPDATE
        users
    SET
        name = ?,
        lastname = ?,
        phone = ?,
        image = ?,
        updated_at = ?
    WHERE
        id = ?
        `;
    db.query
        (
            sql,
            [
                user.name,
                user.lastname,
                user.phone,
                user.image,
                new Date(),
                user.id
            ],
            (err, res) => {
                if (err) {
                    // Si la consulta no se ejecuta correctamente, invoca la función de devolución de llamada con un objeto `Error` como primer argumento y `null` como segundo argumento
                    if (err.fatal) {
                        console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                        console.log('Error:', err);
                        db.destroy(); // Eliminar la conexión envenenada del grupo
                    }
                    console.log('Error:', err);
                    result(err, null);
                }
                else {
                    // Si la consulta se ejecuta correctamente, invoca la función de devolución de llamada con `null` como primer argumento y el ID del nuevo usuario como segundo argumento.
                    console.log('Usuario Actualizado:', user.id);
                    result(null, user.id);
                }
            }
        )
}


User.updateNotificationToken = (id, token, result) => {
    const sql = `
        UPDATE
            users
        SET
            token_notification = ?,
            updated_at = ?
        WHERE
            id = ? 
        `;
    db.query(
        sql,
        [
            token,
            new Date(),
            id
        ],
        (err, res) => {
            if (err) {
                // Si la consulta no se ejecuta correctamente, invoca la función de devolución de llamada con un objeto `Error` como primer argumento y `null` como segundo argumento
                if (err.fatal) {
                    console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                    console.log('Error:', err);
                    db.destroy(); // Eliminar la conexión envenenada del grupo
                }
                console.log('Error:', err);
                result(err, null);
            }
            else {
                // Si la consulta se ejecuta correctamente, invoca la función de devolución de llamada con `null` como primer argumento y el ID del nuevo usuario como segundo argumento.
                console.log('Usuario Actualizado:', id);
                result(null, id);
            }
        }


    )
}



User.updateVerifyStatus = (id, result) => {
    const sql = `
                UPDATE 
                    users
                SET 
                    verify = ?,
                    updated_at = ?
                WHERE 
                    id = ?
                `;
    db.query(
        sql,
        [
            '1',
            new Date(),
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Se actualizo correctamente Verify:', id);
                result(null, id);
            }
        }
    )
}




User.updatePermissionsStatus = (id, result) => {
    const sql = `
                UPDATE 
                    users
                SET 
                    permissions = ?,
                    updated_at = ?
                WHERE 
                    id = ?
                `;
    db.query(
        sql,
        [
            '1',
            new Date(),
            id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Se actualizo correctamente permissions:', id);
                result(null, id);
            }
        }
    )
}

User.getFavoriteProductsByUserId = (id, result) => {
    const sql = `
        SELECT
            U.id AS id_cliente,
            U.name AS nombre_cliente,
            P.id AS id_producto,
            P.name AS nombre_producto,
            COUNT(OHP.id_product) AS total_pedidos
        FROM
            users AS U
        JOIN
            orders AS O ON U.id = O.id_client
        JOIN
            order_has_products AS OHP ON O.id = OHP.id_order
        JOIN
            products AS P ON OHP.id_product = P.id
        WHERE
            U.id = ?
        GROUP BY
            U.id, P.id
        ORDER BY
            total_pedidos DESC;
    `;

    db.query(
        sql,
        [id],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            } else {
                result(null, data);
            }
        }
    );
};


User.delete = (id, result) => {

    const sql = `
    DELETE FROM
        users
    WHERE
        id = ?
    
    
    `;
    db.query(
        sql,
        [id],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Se elimino al cuenta con id : ', id);
                result(null, id);
            }
        }
    )
}

module.exports = User;