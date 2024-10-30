import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loadings from "../Components/Loadings";
import { ProductContext } from "../Utils/Context";
import { toast } from "react-toastify";

const Details = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useContext(ProductContext);
  const [product, setproduct] = useState(null);
  const { id } = useParams(); 




  // const getsingleproduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/products/${id}`);
  //     setproduct(data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    if(!product){
      setproduct(products.filter((p) => p.id == id)[0]);
    }
    //getsingleproduct();
  }, []);

  const ProductDeleteHandler = (id) => {
    const FilteredProducts = products.filter((p) => p.id !== id);
    setproducts(FilteredProducts);
    localStorage.setItem("products", JSON.stringify(FilteredProducts));

    toast.success("Product Deleted successfully");

    navigate("/");
  };

  return product ? (
    <>
    <div className="w-[80%] h-full flex justify-between items-center m-auto p-[10%] ">
      <img
        className="object-contain h-[80%] w-[40%]"
        src={`${product.image}`}
        alt=""
      />
      <div className="content w-[50%] ">
        <h1 className="text-2xl">
          {product.title}
        </h1>
        <h3 className="text-zinc-500 my-3">{product.category}</h3>
        <h2 className="text-red-300 mb-2">$ {product.price}</h2>
        <p className="mb-[5%] text-sm">
          {product.description}
        </p>

        <Link to={`/edit/${product.id}`} className=" mr-5 py-2 px-5 border rounded border-blue-300 text-blue-400">
          Edit
        </Link>
        <button onClick={ () => ProductDeleteHandler(product.id)} className=" py-2 px-2 border rounded border-red-300 text-red-400">
          Delete
        </button>
      </div>
    </div>

    </> 
  ) : ( <Loadings /> );
}

export default Details;
