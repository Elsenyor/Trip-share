// Importamos las dependencias.
import express from 'express';

// Importamos las funciones controladoras finales.
import {
    newEntryController,
    listEntriesController,
    getEntryController,
    addPhotoController,
    deletePhotoController,
    voteEntryController,
    deleteEntryController,
} from '../controllers/entries/index.js';

// Importamos las funciones controladoras intermedias.
import {
    authUserController,
    authUserOptionalController,
} from '../middlewares/index.js';

// Creamos un router.
const router = express.Router();

// Middleware que permite crear una entrada.
router.post('/api/entries', authUserOptionalController, newEntryController);

// Middleware que retorna el listado de entradas.
router.get('/api/entries', listEntriesController);

// Middleware que retorna info de una entrada concreta.
router.get(
    '/api/entries/:entryId',
    authUserOptionalController,
    getEntryController,
);

// Middleware que agrega una foto a una entrada existente.
router.post(
    '/api/entries/:entryId/photos',
    authUserController,
    addPhotoController,
);

// Middleware que elimina una foto de una entrada existente.
router.delete(
    '/api/entries/:entryId/photos/:photoId',
    authUserController,
    deletePhotoController,
);

// Middleware que permite votar una entrada existente.
router.post(
    '/api/entries/:entryId/votes',
    authUserController,
    voteEntryController,
);

// Middleware que permite eliminar una entrada existente.
router.delete(
    '/api/entries/:entryId',
    authUserController,
    deleteEntryController,
);

export default router;
