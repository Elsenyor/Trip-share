// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    newUserController,
    validateUserController,
    loginUserController,
    getOwnUserController,
    getPublicUserController,
    editUserController,
    editUserAvatarController,
} from '../controllers/users/index.js';

// Importamos las funciones controladoras intermedias.
import { authUserController } from '../middlewares/index.js';

// Creamos un router.
const router = express.Router();

// Middleware de creación de usuario.
router.post('/api/users/register', newUserController);

// Middleware de activación de usuario.
router.put('/api/users/validate/:registrationCode', validateUserController);

// Middleware de login de usuario.
router.post('/api/users/login', loginUserController);

// Middleware que retorna info privada de un usuario.
router.get('/api/users', authUserController, getOwnUserController);

// Middleware que retorna info pública de un usuario.
router.get('/api/users/:userId', getPublicUserController);

// Middleware que permite cambiar el nombre de usuario y/o el email.
router.put('/api/users', authUserController, editUserController);

// Middleware que permite cambiar el avatar de un usuario.
router.put('/api/users/avatar', authUserController, editUserAvatarController);

export default router;
