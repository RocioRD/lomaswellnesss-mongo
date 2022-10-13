import 'dotenv/config';
import mongodb from 'mongodb';

const mongoCliente = mongodb.MongoClient;
let dia = new Date();
let fechaData = dia.toLocaleDateString();


//Formulario para llenar las tarea

/* export const home = (req, res) => {
    res.send('<h1>Mi App de Tareas</h1>')
} */

export const formUsuario = (req, res) => {
    res.render('agregarUsuarios')
}
//Obtenemos las tareas
export const getUsuarios = (req, res) =>{

    mongoCliente.connect(process.env.MONGOLOCAL, (error, db) =>{
        const database = db.db('lomaswellnesss');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);
            database.collection('usuarios').find({}).toArray((error, result) => {
                if (error) {
                    throw error;
                }else{
                    /*
                    res.render('home', { 
                        result
                    })
                    */
                   res.json(result)
                }
            })
        }
    });
};


export const getUsuarioByID = (req, res) => {
    mongoCliente.connect(process.env.MONGOLOCAL, (error, db) =>{
        const database = db.db('lomaswellnesss');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let id = req.params.id;

            database.collection('usuarios').findOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) {
                    throw error;
                }else{
                    /*res.render('editarTarea', { 
                        result*/
                        res.json(result)
                    //})
                }
            })
        }
    });
}


//Creación de las tareas
export const createUsuarios = (req, res) => {
    
    const { nombre, edad, email } = req.body;
            
    mongoCliente.connect(process.env.MONGOLOCAL, (error, db) =>{
        const database = db.db('lomaswellnesss');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{ 

        console.log(`Conexion correcta a la Database`);        
            database.collection('usuarios').insertOne({ nombre, edad, email}, (error, result) => {
                if (error) {
                    throw error;
                }else{
                    //res.render('agregarTareas')
                    res.json({hola: 'lala'})
                }
            })  
        } 
    }); 
}

//Actualizar usuarios
export const updateUsuarios = (req, res) =>{

    mongoCliente.connect(process.env.MONGOLOCAL, (error, db) =>{
        const database = db.db('lomaswellnesss');
        if (error) {
            console.log(`No estamos conectados a la Database`);
        }else{
            console.log(`Conexion correcta a la Database`);

            let ObjectId = mongodb.ObjectId;
            let id = req.params.id;

            console.log(ObjectId(id));
            
            const { titulo, autor, descripcion, nivel} = req.body;

            database.collection('usuarios').findOne({_id: ObjectId(id)}, {$set: {titulo, autor, descripcion, nivel}} ,(error, result) => {
                error? console.log(error.message) :
                database.collection('usuarios').replaceOne({_id: ObjectId(id)},{titulo, autor, descripcion, nivel, fecha: fechaData}, )
                //console.log(req.body)
                    res.redirect('/')
                })
        }
    });
};

export const deleteUsuarios = (req, res) => {

    mongoCliente.connect(process.env.MONGOLOCAL, (error, db) =>{
        const database = db.db('lomaswellnesss');  //se crea la constante database q tiene como valor la instancia de la base de datos que tiene como nombre pwatt
        if (error) { // if sentencia condicional
            console.log(`No estamos conectados a la Database`);
        }else{  
            console.log(`Conexion correcta a la Database`);
            
            const ObjectId = mongodb.ObjectId;
            const id = req.params.id;
                                           //json compuesto x: key: value
        database.collection('usuarios').deleteOne({_id: ObjectId(id)}, (error, result) =>{
                if (error) {                                               //arrow function
                    throw error;
                }else{
                    res.json({message: "Usuarie eliminade!"})
                }
            })
        }
    });
}