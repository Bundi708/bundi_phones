import { data, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";



const MakePaymentsComponent = () => {
    const { product } = useLocation().state || {};
    let [phone, setphone] = useState();

    let [loading, setLoading] = useState();
    let [error, setError] = useState();
    let [succes, setSuccess] = useState();
    const img_url = "https://bundi.alwaysdata.net/static/images/"
    console.log(product);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading("please wait..");
        setSuccess("");

        try {
            const data = new FormData()
            data.append("amount", product.product_cost)
            data.append('phone', phone)
            const response = await axios.post("https://bundi.alwaysdata.net/api/mpesa_payment", data)

            console.log(response);
            if (response.status === 200) {
                setLoading("");
                setSuccess(response.data.message)
            }

        } catch (error) {
            setLoading("")
            setError(error.message)

        }


    }
    return (
        <div className="row justify-content-center mt-3">
             <Navbar/>
            <h2>LIPA NA MPESA</h2>
            <div className="col-md-3">
                <img src={img_url + product.product_image} className="rounded img-thumbnail" alt="" />

            </div>
            <div className="col-md-3">
                <h2 className="text-dark">{product.product_name}</h2>
                <h5 className="text-primary"> {product.product_category}</h5>
                <p className="text_muted"> {product.product_description}</p>
                <h3 className="text-warning"> {product.product_cost}</h3>
                <hr />
                <h6 className="text-warning">{loading}</h6>
                <h6 className="text-danger">{error}</h6>
                <h6 className="text-succes">{succes}</h6>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        className="form-control"
                        readonly
                        value={120000}
                        placeholder="Enter amount" />

                    <br />
                    <input type="text"
                        className="form-control"
                        placeholder="Enter MPesa Number 2547xxxxxxx" onChange={(e) => { setphone(e.target.value) }} />
                    <button className="btn btn-dark"> pay now</button>
                </form>


            </div>

        </div>
    )
}
export default MakePaymentsComponent;