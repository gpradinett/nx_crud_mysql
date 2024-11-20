"use client";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "", // Agregar el campo de imagen
  });
  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products/" + params.id)
        .then((res) => {
          setProduct({
            name: res.data.name,
            price: res.data.price,
            description: res.data.description,
            image: res.data.image, // Agregar imagen si es existente
          });
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    // Subir la imagen si hay un archivo
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // El preset de carga

      try {
        console.log("Enviando imagen a Cloudinary...");  // Verificar que se está enviando
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/cloud-eventicks/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              api_key: "966286922473343",  // api_key de Cloudinary
              api_secret: "UhtcM_Jq3tb8QfafxoNpgBfnEes",  // api_secret de Cloudinary
            },
          }
        );
        console.log("Imagen enviada correctamente a Cloudinary");  // Confirmación de envío

        // Aquí obtenemos la URL de la imagen
        imageUrl = cloudinaryResponse.data.secure_url;
        console.log("URL de la imagen obtenida de Cloudinary:", imageUrl);  // Verificar la URL obtenida
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }

    // Crear el objeto de datos, incluyendo la URL de la imagen
    const productData = {
      name: product.name,
      price: product.price,
      description: product.description,
      image: imageUrl, // Usar la URL de la imagen obtenida de Cloudinary
    };

    try {
      let res;
      if (!params.id) {
        // Crear producto
        res = await axios.post("/api/products", productData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        // Actualizar producto
        res = await axios.put("/api/products/" + params.id, productData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      console.log("Producto guardado exitosamente:", res.data);  // Verificar la respuesta del servidor

      // Limpiar el formulario y redirigir
      form.current.reset();
      router.push("/products");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Product Name:
        </label>
        <input
          name="name"
          type="text"
          placeholder="name"
          onChange={handleChange}
          value={product.name}
          className="shadow appearance-none border rounded w-full py-2 px-3"
          autoFocus
        />

        <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">
          Product Price:
        </label>
        <input
          name="price"
          type="number"
          placeholder="00.00"
          onChange={handleChange}
          value={product.price}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
          Product Description:
        </label>
        <textarea
          name="description"
          rows={3}
          placeholder="description"
          onChange={handleChange}
          value={product.description}
          className="shadow appearance-none border rounded w-full py-2 px-3"
        />

        <label htmlFor="productImage" className="block text-gray-700 text-sm font-bold mb-2">
          Product Image:
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 mb-2"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && (
          <img
            className="w-96 object-contain mx-auto my-4"
            src={URL.createObjectURL(file)}
            alt="preview"
          />
        )}

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {params.id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
