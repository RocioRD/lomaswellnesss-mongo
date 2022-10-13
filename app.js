import express from 'express';
import 'dotenv/config';
import path from 'path';
import hbs from 'hbs';
import morgan from 'morgan';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import { router } from './src/router/homeRouter.js'; 
//import './src/db/conexion.js';

//Definimos la ruto del scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Inicio
const PORT = process.env.PORT_APP || 4000;
const app = express();

//Middelwares
app.use(morgan('common')); // 'dev' - 'combined'
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, '/public')));

//Seteamos hbs
app.set('views engine', 'hbs');
app.set('views', path.join(__dirname, 'src/views'));
hbs.registerPartials(path.join(__dirname, 'src/views/partials'))

//Rutas
app.use(router);

app.get('/', (req, res) => {
    res.send(`<h1>Bienvenidos a mis App con ES6</h1>`)
});

app.listen(PORT, () => {
    console.log(`Aplicación con Yarn y ES6 corriendo en el Puerto: ${PORT}`);
});