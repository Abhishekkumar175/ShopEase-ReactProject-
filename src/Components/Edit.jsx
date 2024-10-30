import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ProductContext } from '../Utils/Context';
import { toast } from 'react-toastify';

function Edit() {
    const [products, setproducts] = useContext(ProductContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [product, setproduct] = useState({
        
        image: "",
        title: "",
        category: "",
        price: "",
        description: ""
    });
   
    const ChangeHandler = (e) => {
        //console.log(e.target.name, e.target.value);
        setproduct({...product, [e.target.name]: e.target.value });
    };

    useEffect(() => {
      setproduct(products.filter((p) => p.id == id)[0]);
    },[id]);
    //console.log(product);

    const AddProductHandler = (e) => {
        e.preventDefault();
        if(product.image.trim().length < 5 || product.title.trim().length < 5|| product.category.trim().length < 5 || product.price.trim().length < 1 || product.description.trim().length < 5 ){
          alert('Please fill in all required fields with minimum 5 characters.');
          return;
        }

        const pi = products.findIndex((p) => p.id == id);
        const copyData = [...products];
        copyData[pi] = {...products[pi], ...product}; 
        
        setproducts(copyData);

        // const product = { id:nanoid(),image, title, category, price, description };
        // console.log(product);

        localStorage.setItem("products", JSON.stringify(copyData));
        toast.success("Product updated successfully")
        navigate(-1);
         
    };


  return (
    <>
    <form onSubmit={AddProductHandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='mb-5 w-1/2 text-3xl '>Edit Product</h1>
        <input
          type='url'
          placeholder='image url'
          className='text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-4'
          value={product && product.image}
          name="image"
          onChange={ChangeHandler}
        />
        <input
          type='text'
          placeholder='product title'
          className='text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-4'
          value={product && product.title}
          name="title"
          onChange={ChangeHandler}
        />
        <div className='w-1/2 flex justify-between'>
        <input
          type='text'
          placeholder='product category'
          className='text-1xl bg-zinc-100 rounded p-2 w-[48%] mb-4'
          value={product && product.category}
          name="category"
          onChange={ChangeHandler}
        />
        <input
          type='number'
          placeholder='price'
          className='text-1xl bg-zinc-100 rounded p-2 w-[48%] mb-4'
          value={product && product.price}
          name="price"
          onChange={ChangeHandler}
        />
        </div>
        <textarea
          placeholder='product description'
          value={product && product.description}
          className='text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-4'
          name="description"
          onChange={ChangeHandler}
          rows="5"
        />
        <div className='w-1/2'>
          <button className='py-2 px-5 border rounded border-blue-200 text-blue-300'>
            Edit Product
          </button>
        </div>
        
    </form>
  </>
  )
}

export default Edit;