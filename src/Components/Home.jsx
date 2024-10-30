import { Link, useLocation } from "react-router-dom";
import Nav from "../Components/Nav";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Utils/Context";
import Loadings from "../Components/Loadings";
import axios from "../Utils/axios";

function Home() {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setfilteredProducts] = useState(null);

  const getproductscategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setfilteredProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!filteredProducts || category == "undefined") setfilteredProducts(products); 
    if(category != "undefined") {
      //getproductscategory()
      setfilteredProducts(products.filter((p) => p.category == category)); 
    };  
    
  }, [category, products]);


  return products ? (
    <>
      <Nav />
      <div className="h-full w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto  ">
        {filteredProducts &&
          filteredProducts.map((p, i) => (
            <Link
              key={p.id}
              to={`/details/${p.id}`}
              className="mr-3 mb-3 card p-3 border shadow rouned w-[18%] h-[30vh] flex-col flex justify-center items-center"
            >
              <div
                className="hover:scale-110 mb-3 w-full h-[80%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: `url(${p.image})`,
                }}
              ></div>
              <h1 className="text-xs ">{p.title}.</h1>
            </Link>
          ))}
      </div>
    </>
  ) : (
    <Loadings />
  );
}

export default Home;
