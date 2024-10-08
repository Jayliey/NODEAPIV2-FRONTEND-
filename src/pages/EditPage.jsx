import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { VITE_BACKEND_URL } from "../App";


const EditPage = () => {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [product,setProduct] = useState({
        name: "",
        quantity: "",
        price: "",
        image: "",
    })

    const getProduct = async() =>{
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/api/products/${id}`)
            setProduct({
                name: response.data.name,
                quantity: response.data.quantity,
                price: response.data.price,
                image: response.data.image,
            })
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message)
        }
    }

    const updateProduct = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`${VITE_BACKEND_URL}/api/products/${id}`, product);
            toast.success(`Updated successfully`);
            navigate("/home");
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    useEffect(()=> {
        getProduct();
    }, [])

    return(
        <div className="mx-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
        <h2 className="font-semibold text-2xl mb-4 block text-center">
            Update A Product
        </h2>
        {isLoading ? ("Loading") : (
            <>
                <form action="" onSubmit={updateProduct}>
                    <div className="space-y-2">
                        <label>Name:</label>
                        <input type="text" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name..."/>
                    </div>
                    <div className="space-y-2">
                        <label>Quantity:</label>
                        <input type="Number" value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value})}  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Quantity..."/>
                    </div>
                    <div className="space-y-2">
                        <label>Price:</label>
                        <input type="Number" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price..."/>
                    </div>
                    <div className="space-y-2">
                        <label>Image URL:</label>
                        <input type="text" value={product.image} onChange={(e) => setProduct({...product, image: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL..."/>
                    </div>
                    <div>
                        {!isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)}
                    </div>
                </form>
            </>
        )}
    </div>
    )
}

export default EditPage;