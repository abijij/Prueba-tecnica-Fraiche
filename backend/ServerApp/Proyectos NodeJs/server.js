
const express = require('express');

const app = express();

const http = require('http');

const server = http.createServer(app);

const logger = require('morgan');

const cors = require('cors');

const passport = require('passport');

const multer = require('multer');




const usersRoutes = require('./routes/userRoutes');

const categoriesRoutes = require('./routes/categoriesRoutes');

const productsRoutes = require('./routes/ProductRoutes');


const port = process.env.PORT || 80;


app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


app.use(cors());

app.use(passport.initialize());


app.use(passport.session());

require('./config/passport')(passport);


app.disable('x-powered-by');


app.set('port', port);


const upload = multer({
    storage: multer.memoryStorage()
});



usersRoutes(app, upload);
categoriesRoutes(app, upload);
productsRoutes(app, upload);

    server.listen(port, '172.26.8.235', function () {
        console.log('Listering port ' + port)
    });


app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});


module.exports = {
    app: app,
    server: server
}

