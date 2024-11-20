import { NextResponse } from 'next/server';
import { conn } from '@/libs/mysql';

export async function GET() {
    try {
        // Realizar la consulta
        const [rows] = await conn.query('SELECT NOW()');
        console.log(rows);
        
        // Retornar la respuesta en JSON
        return NextResponse.json({ message: 'hello world', data: rows });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Error fetching data', error: error.message },
            { status: 500 }
        );
    }
}
