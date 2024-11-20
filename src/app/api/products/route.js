import { NextResponse } from "next/server";
import { conn } from '@/libs/mysql'

export async function GET() {
    try {
      // Ejecuta la consulta SELECT utilizando `execute` en lugar de `query`
      const [rows] = await conn.execute("SELECT * FROM product");
  
      // Devuelve los resultados como respuesta JSON
      return NextResponse.json(rows);
    } catch (error) {
      // En caso de error, captura el mensaje y devuelve una respuesta con estado 500
      console.error("Error:", error);
  
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }

  export async function POST(request) {
    try {
      const { name, description, price, image } = await request.json();
  
      if (!name || !description || isNaN(price)) {
        return NextResponse.json(
          { message: "Invalid data provided" },
          { status: 400 }
        );
      }
  
      const [result] = await conn.execute(
        "INSERT INTO product (name, description, price, image) VALUES (?, ?, ?, ?)",
        [name, description, price, image]
      );
  
      return NextResponse.json({
        name,
        description,
        price,
        image,
        id: result.insertId,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
  