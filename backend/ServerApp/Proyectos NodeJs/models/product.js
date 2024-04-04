const db = require('../config/config');
const Product = {};

Product.findByCategory = (id_category, result) => {

    const sql = `
    
        SELECT
            P.id,
            P.name,
            P.description,
            P.price,
            P.image1,
            P.image2,
            P.image3,
            P.id_category,
            P.created_at,
            P.updated_at,
            P.sku,
            P.sku_alt,
            P.purchase_department,
            P.promo_price,
            P.stock,
            P.promo_quantity,
            P.tax,
            P.price3

        FROM
            products as P
        WHERE
            P.id_category = ?
    `;
    db.query(
        sql,
        [id_category],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo producto:', res);
                result(null, res);
            }
        }
    )
}

Product.findByCategoryPagination = (id_category, page, result) => {
    // Validar que page sea un número positivo.
    if (isNaN(page) || page <= 0) {
        const error = new Error('Valor de página no válido.');
        console.error('Error:', error);
        return result(error, null);
    }

    const itemsPerPage = 10; 
    const offset = (page - 1) * itemsPerPage; 

    const sql = `
        SELECT
            P.id,
            P.name,
            P.description,
            P.price,
            P.image1,
            P.image2,
            P.image3,
            P.id_category,
            P.created_at,
            P.updated_at,
            P.sku,
            P.sku_alt,
            P.purchase_department,
            P.promo_price,
            P.stock,
            P.promo_quantity,
            P.tax,
            P.price3
        FROM
            products AS P
        WHERE
            P.id_category = ?
        LIMIT ?, ?; 
    `;

    db.query(
        sql,
        [id_category, offset, itemsPerPage],
        (err, res) => {
            if (err) {
                console.error('Error:', err);
                return result(err, null);
            } else {
                console.log('Productos recuperados:', res);
                return result(null, res);
            }
        }
    );
};



Product.create = (product, result) => {

    const sql = `
    INSERT INTO
        products(
            name,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at,
            sku,
            sku_alt,
            purchase_department,
            promo_price,
            stock,
            promo_quantity,
            tax,
            price3
        )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            
    `;
    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            new Date(),
            product.sku,
            product.sku_alt,
            product.purchase_department,
            product.promo_price,
            product.stock,
            product.promo_quantity,
            product.tax,
            product.price3
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}


Product.update = (product, result) => {

    const sql = `
    UPDATE
        products
    SET
        name = ?,
        description = ?,
        price = ?,
        image1 = ?,
        image2 = ?,
        image3 = ?,
        id_category = ?,
        updated_at = ?,
        sku = ?,
        sku_alt = ?,
        purchase_department = ?,
        promo_price = ?,
        stock = ?,
        promo_quantity = ?,
        tax = ?,
        price3 = ?
    WHERE
        id = ? 
            
    `;
    db.query(
        sql,
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            product.sku,
            product.sku_alt,
            product.purchase_department,
            product.promo_price,
            product.stock,
            product.promo_quantity,
            product.tax,
            product.price3,
            product.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }
    )
}

Product.updateStock = (product, result) => {

    const sql = `
    UPDATE
        products
    SET
        id_category = ?,
        updated_at = ?,
        stock = ?,
    WHERE
        id = ? 
            
    `;
    db.query(
        sql,
        [
            product.id_category,
            new Date(),
            product.stock,
            product.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }
    )
}

Product.delete = (id, result) => {

    const sql = `
    DELETE FROM
        products
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
                console.log('Id del producto eliminado:', id);
                result(null, id);
            }
        }
    )
}


Product.updateStock = (id, stock, result) => {
    const sql = `
        UPDATE
            products
        SET
            stock = ?,
            updated_at = ?
        WHERE
            id = ? 
        `;
    db.query(
        sql,
        [
            stock,
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
                console.log('Stock Actualizado:', id);
                result(null, id);
            }
        }


    )
}

Product.searchByName = (name, result) => {
    const sql = `
    
        SELECT
            P.id,
            P.name,
            P.description,
            P.price,
            P.image1,
            P.image2,
            P.image3,
            P.id_category,
            P.created_at,
            P.updated_at,
            P.sku,
            P.sku_alt,
            P.purchase_department,
            P.promo_price,
            P.stock,
            P.promo_quantity,
            P.tax,
            P.price3
        FROM 
            products as P
        WHERE
            P.name LIKE ?
    
    `;
    const searchPattern = `%${name}%`;
    db.query(
        sql,
        [
            searchPattern
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
                console.log('Producto(s) obtenido(s):' + JSON.stringify(res, null, 3));
                result(null, res);
            }
        }

    )
}

Product.findById = (id, resultado) => {
    const sql = `
        SELECT
            P.id,
            P.name,
            P.description,
            P.price,
            P.image1,
            P.image2,
            P.image3,
            P.id_category,
            P.created_at,
            P.updated_at,
            P.sku,
            P.sku_alt,
            P.purchase_department,
            P.promo_price,
            P.stock,
            P.promo_quantity,
            P.tax,
            P.price3
        FROM 
            products as P
        WHERE
            P.id = ?
    `;

    db.query(
        sql,
        [id],
        (err, res) => {
            if (err) {
                if (err.fatal) {
                    console.error('La conexión se volvió inútil. Se debe llamar a connection.destroy().');
                    console.log('Error:', err);
                    db.destroy();
                }
                console.log('Error:', err);
                resultado(err, null);
            } else {
                console.log('Producto encontrado:', JSON.stringify(res, null, 3));
                resultado(null, res);
            }
        }
    );
}



Product.findTotalProductsByCategory = (category_id, result) => {

    const sql = `
        SELECT
            C.id AS category_id,
            C.name AS category_name,
            COUNT(P.id) AS total_products
        FROM
            categories AS C
        LEFT JOIN
            products AS P ON C.id = P.id_category
        WHERE
            C.id = ?
        GROUP BY
            C.id, C.name
    `;
    
    db.query(
        sql,
        [category_id],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Total de productos por categoría:', res);
                result(null, res);
            }
        }
    )
}

module.exports = Product;