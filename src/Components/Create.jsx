import React, { useContext, useState } from 'react'
import { ProductContext } from '../Utils/Context';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function Create() {
    const navigate = useNavigate();
    const [products, setproducts] = useContext(ProductContext);
    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");

    const AddProductHandler = (e) => {
        e.preventDefault();
        if(image.trim().length < 5 || title.trim().length < 5|| category.trim().length < 5 || price.trim().length < 1 || description.trim().length < 5 ){
          alert('Please fill in all required fields with minimum 5 characters.');
          return;
        }
        
        const product = { id:nanoid(),image, title, category, price, description };
        //console.log(product);
        setproducts([...products, product]);
        localStorage.setItem("products", JSON.stringify([...products, product]));

        toast.success("Product Added successfully");

        navigate("/");
         
    };

  return (
  <>
    <form onSubmit={AddProductHandler} className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='mb-5 w-1/2 text-3xl '>Add New Product</h1>
        <input
          type='url'
          placeholder='image url'
          className='text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-4'
          value={image}
          onChange={(e) => setimage(e.target.value)}
        />
        <input
          type='text'
          placeholder='product title'
          className='text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-4'
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <div className='w-1/2 flex justify-between'>
        <input
          type='text'
          placeholder='product category'
          className='text-1xl bg-zinc-100 rounded p-2 w-[48%] mb-4'
          value={category}
          onChange={(e) => setcategory(e.target.value)}
        />
        <input
          type='number'
          placeholder='price'
          className='text-1xl bg-zinc-100 rounded p-2 w-[48%] mb-4'
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        </div>
        <textarea
          placeholder='product description'
          value={description}
          className='text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-4'
          onChange={(e) => setdescription(e.target.value)}
          rows="5"
        />
        <div className='w-1/2'>
          <button className='py-2 px-5 border rounded border-blue-200 text-blue-300'>
            Add New Product
          </button>
        </div>
        
    </form>
  </>
  )
}

export default Create;