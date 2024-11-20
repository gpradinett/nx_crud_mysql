import { NextResponse } from "next/server";
import { conn } from "@/libs/mysql"

export async function GET(request, { params }) {
    try {
        // Espera a que los parámetros estén disponibles
        const { id } = await params; // Esto asegura que `params` esté completamente cargado

        const [result] = await conn.execute('SELECT * FROM product WHERE id = ?', [id]);

        if (result.length === 0) {
            return NextResponse.json(
                {
                    message: "Producto no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(result[0]);
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}
  

export async function DELETE(request, { params }) {
    try {
        // Esperar a que `params` esté disponible
        const { id } = await params; // Esto asegura que `params` esté completamente cargado

        // Aquí puedes agregar la lógica para eliminar el producto
        const [result] = await conn.execute('DELETE FROM product WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Producto no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            message: "Producto eliminado correctamente",
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        // Esperar a que `params` esté disponible
        const { id } = await params; // Esto asegura que `params` esté completamente cargado

        // Obtener los datos del cuerpo de la solicitud (suponiendo que el cuerpo tenga los datos para actualizar el producto)
        const body = await request.json();
        const { name, price, description } = body; // Ejemplo de campos que podrían ser actualizados

        // Lógica para actualizar el producto en la base de datos
        const [result] = await conn.execute(
            'UPDATE product SET name = ?, price = ?, description = ? WHERE id = ?',
            [name, price, description, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                {
                    message: "Producto no encontrado",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json({
            message: "Producto actualizado correctamente",
        });
    } catch (error) {
        return NextResponse.json(
            {
                message: error.message,
            },
            { status: 500 }
        );
    }
}