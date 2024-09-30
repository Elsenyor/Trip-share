// Importamos los modelos.
import selectAllEntriesModel from '../../models/entries/selectAllEntriesModel.js';
import selectTotalNumberOfEntriesModel from '../../models/entries/selectTotalNumberOfEntriesModel.js';

// Función controladora final que retorna el listado de entradas. Permite filtrar por autor
// y por palabra clave.
const listEntriesController = async (req, res, next) => {
    try {
        // Obtenemos los query params corespondientes.
        let { author, place, keyword, page = 1, entryQuantity = 4 } = req.query;
        // Modificamos el tipo de la variable page de String a Number.
        page = Number(page);

        // Calculamos el offset badado en la página actual (dependiendo del screen size del cliente mostrara 4 en vista movil-tablet y 8 en version pc).
        const limit = Number(entryQuantity);
        const offset = (page - 1) * limit;

        // Obtenemos el número total de entradas.
        const totalEntries = await selectTotalNumberOfEntriesModel();

        // Calculamos el número total de páginas.
        const totalPages = Math.ceil(totalEntries / limit);

        const entries = await selectAllEntriesModel(
            author,
            place,
            keyword,
            req.user?.id,
            limit,
            offset,
        );
        console.log('listentrycontroller - totalPages', totalPages);

        res.send({
            status: 'ok',
            data: {
                totalPages,
                prevPage: page > 1 ? page - 1 : null,
                currentPage: page,
                nextPage: page < totalPages ? page + 1 : null,
                entries,
                totalEntries,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listEntriesController;
