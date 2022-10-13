
import { Router } from 'express';
import { 
  /*   home, */
    getUsuarios, 
    getUsuarioByID,
    formUsuario,
    createUsuarios, 
    updateUsuarios,
    deleteUsuarios 
} from '../controllers/homeController.js'
// from '../controllers/homeControllerAtlas.js'

export const router = Router();

/* router.get('/', home) */
router.get('/', getUsuarios);
router.get('/editarUsuario/:id', getUsuarioByID)
router.get('/addUsuario', formUsuario);
router.post('/create', createUsuarios);
router.put('/actualizar/:id', updateUsuarios);
router.delete('/delete/:id', deleteUsuarios);

// metodo http / nombre endpoint / metodo a ejecutarse 