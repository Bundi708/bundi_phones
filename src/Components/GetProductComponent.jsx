import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const GetProductComponent = () => {

    let [products, setProducts] = useState([])
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [search_word, setSearchWord] = useState("");
    let [filterd_products, setFilterdProducts] =useState([])
    let [tecno,setTecno] = useState([]);
    let [samsung,setSamsung] = useState([]);
    let [redmi,setRedmi] =useState([]);
    let [infinix,setInfinix] =useState([]);
    let [oppo,setOppo] =useState([]);
    let [vivo,setVivo] =useState([]);
    let [nokia,setNokia] =useState([]);
    let [huawei,setHuawei] =useState([]);




     let navigator = useNavigate();

    // Base url for image location
    const img_url = "https://bundi.alwaysdata.net/static/images/"

   

    // function to fetch products from the server

    const getProducts = async () => {
        console.log("getting products")
        setError("");
        setLoading("Fetch products. Please wait...")

        try {
            const response = await axios.get("https://bundi.alwaysdata.net/api/get_products")
            console.log(response);
            if (response.status === 200) {
                setLoading("");
                setProducts(response.data);

                let oppo_bundi = response.data.filter(
                    (product)=> product.product_category ==="oppo",
                );
                setOppo(oppo_bundi)
            }
        } catch (error) {
            setLoading("")
            setError(error.message);
        };
    };

    useEffect(() => { getProducts(); }, [])
    const handlesearch = (search_word) =>{
        let filterd =products.filter((product) =>
        product.product_name.toLowerCase().includes(search_word.toLowerCase()),);
        setFilterdProducts(filterd);
        
   
    }
     useEffect(()=>{
        handlesearch(search_word);
    },[search_word]);  
    return (
        <div className="row">
             <Navbar/>
            <h3>Available Products</h3>
            <h5 className="text-warning">{loading}</h5>
            <h5 className="text-danger">{error}</h5>
            {/* map/loop over the product array to access one at a time */}

            {tecno.map((product) => (
                <div className="col-md-3 justiy-content-center mb-4" >
                    <div className="card shadow -margin">
                        <img src={img_url + product.product_image} alt="" className="product_img mt-4" />

                        <div className="card-body">
                            <h5 className="mt-2">{product.product_name}</h5>
                            <p className="text-muted">{product.product_description}</p>
                            <b className="text-warning">{product.product_cost}</b>
                            <br />
                            <button className="btn btn-dark" onClick={() => { navigator("/makepayment",{state: {product}}) }}>Purchase Now</button>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}
export default GetProductComponent;