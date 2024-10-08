// Importamos los modelos.
import insertEntryModel from '../../models/entries/insertEntryModel.js';
import insertPhotoModel from '../../models/entries/insertPhotoModel.js';
// Importamos la función que permite guardar una foto en disco.
import { savePhoto } from '../../services/photoService.js';
// Importamos la función que valida esquemas.
// import validateSchema from '../../utilities/validateSchema.js';
// // Importamos el esquema de Joi.
// import newEntrySchema from '../../schemas/entries/newEntrySchema.js';

// Función controladora final que agrega una nueva entrada.
const newEntryController = async (req, res, next) => {
    console.log('req.files --> newEntryController', req.files);
    try {
        // Validamos los datos con Joi. Fusionamos en un solo objeto las propiedades de body y de files
        // con Object.assign.
        // await validateSchema(newEntrySchema, Object.assign(req.body));

        // Obtenemos los campos necesarios del body.
        const { title, place, description } = req.body;

        // Insertamos la entrada y obtenemos el ID que la base de datos le ha otorgado.
        const entryId = await insertEntryModel(
            title,
            place,
            description,
            req.user.id,
        );

        // Array donde pushearemos las posibles fotos.
        const photos = [];

        // Si "req.files" existe quiere decir que hay algún archivo en la petición.
        if (req.files) {
            const photosArr = req.files.photos.slice(0, 3); // Limitar a 3 fotos por seguridad
            for (const photo of photosArr) {
                try {
                    const photoName = await savePhoto(photo, 800); // Ajustar el tamaño de la imagen
                    const photoId = await insertPhotoModel(photoName, entryId);
                    photos.push({ id: photoId, name: photoName });
                } catch (error) {
                    console.error(
                        `Error procesando la foto ${photo.name}:`,
                        error,
                    );
                }
            }
        }

        res.status(201).send({
            status: 'ok',
            message: 'Entrada creada',
            data: {
                entry: {
                    id: entryId,
                    title,
                    place,
                    description,
                    userId: req.user.id,
                    photos,
                    createdAt: new Date(),
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default newEntryController;
