import Buttons from "./Buttons";
import { conn } from "@/libs/mysql";

async function loadProduct(productId) {
  const [rows] = await conn.execute("SELECT * FROM product WHERE id = ?", [
    productId,
  ]);
  return rows[0];
}

export async function generateStaticParams() {
  const [rows] = await conn.execute("SELECT id FROM product");
  return rows.map((product) => ({ id: product.id.toString() }));
}

async function ProductPage({ params }) {
  const product = await loadProduct(params.id);

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)]">
      <div className="flex w-4/6 h-2/6 justify-center">
        <div className="p-6 bg-white w-1/3">
          <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
          <h4 className="text-4xl font-bold">{product.price}$</h4>
          <p className="text-slate-700">{product.description}</p>
          <Buttons productId={product.id} />
        </div>
        {product.image && (
          <img
            src={product.image}
            className="w-1/3 object-cover"
            alt={product.name || "Producto"}
          />
        )}
      </div>
    </section>
  );
}

export default ProductPage;
