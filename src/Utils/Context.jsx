import React, { createContext, useEffect, useState } from "react";

export const ProductContext = createContext();

const Context = (props) => {
    const [products, setproducts] = useState(JSON.parse(localStorage.getItem("products"))|| null);
    // const getproducts = async () => {
    //     try {
    //         const {data} = await axios("/products");
    //         setproducts(data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // useEffect(() => {
    //     getproducts();
    // }, []);
    
    return (
        <ProductContext.Provider value={[products, setproducts]}>
            {props.children}
        </ProductContext.Provider>
    );    
};


export default Context