// Importamos las dependencias.
import mysql from 'mysql2/promise';

// Importamos las variables de entorno.
import { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } from '../../env.js';

// Variable que almacenará un pool de conexiones.
let pool;

// Función que retorna un pool de conexiones.
const getPool = async () => {
    try {
        // Si no hay un pool de conexiones, es decir, si la variable pool contiene un
        // valor considerado falso, creamos el pool
        if (!pool) {
            // Creamos un pool temporal con el único fin de crear la base de datos.
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });

            // Creamos el pool de conexiones final.
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB,
                timezone: 'Z',
            });
        }
        // Retornamos el pool.
        return pool;
    } catch (err) {
        console.error(err);
    }
};

// Exportamos la función anterior.
export default getPool;
