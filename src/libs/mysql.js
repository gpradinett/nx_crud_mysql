import mysql from 'mysql2/promise';

// Crear el pool de conexiones
export const conn = mysql.createPool({
    host: 'autorack.proxy.rlwy.net',
    user: 'root',
    password: 'oFVcrtmfgVyHefDjZxmvroQgEmXgiqVh',
    port: 58977,
    database: 'next_crud_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
