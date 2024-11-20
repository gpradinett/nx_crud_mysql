import ProductCard from "@/components/ProductCard";
import {conn} from '@/libs/mysql'

async function loadProducts() {
    const [rows] = await conn.execute('SELECT * FROM product'); // Extrae solo las filas
    return rows;
}

export const dynamic = 'force-dynamic'

async function ProductsPage() {
  const products = await loadProducts();

  return <div className="grid gap-4 grid-cols-4">
  {products.map((product) => (
    <ProductCard product={product} key={product.id} /> // Usa 'product.id' como clave única
  ))}
</div>
}

export default ProductsPage;