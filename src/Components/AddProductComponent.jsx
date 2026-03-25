import axios from "axios";
import { useState } from "react";
import Navbar from "./Navbar";

const AddProductComponent = () => {
    let [product_name, setProductName] = useState("");
    let [product_description, setProductDescription] = useState("");
    let [product_cost, setProductCost] = useState("");
    let [product_category, setProductCategory] = useState("");
    let [product_image, setProductImage] = useState("");


    // notify process progress of the programme
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setSuccess("")
        setLoading("Please...")

        // try semnd data to server
        try {
            const product_data = new FormData();
            product_data.append("product_name", product_name);
            product_data.append("product_description", product_description);
            product_data.append("product_cost", product_cost);
            product_data.append("product_category", product_category);
            product_data.append("product_image", product_image);


            const response = await axios.post("https://bundi.alwaysdata.net/api/add_product", product_data);
            console.log(response);

            if (response.status === 200) {
                setLoading("");
                setSuccess(response.data.message);

                // clear the form
                setProductName("");
                setProductDescription("");
                setProductCost("");
                setProductCategory("");
                setProductImage("");
            }

        } catch (error) {
            setError(error.message);
            setLoading("");
        }



    };

    return (
        <div className="row justify-content-center mt-4">
             <Navbar/>
            <div className="col-md-6 card shadow p-4">
                <h2>Add product</h2>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-success">{success} </h5>

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the product name"
                            required
                            onChange={(e) => { setProductName(e.target.value) }}
                            value={product_name}
                        />
                        <br />

                        <textarea
                            className="form-control"
                            rows="7"
                            placeholder="Enter your product description"
                            required
                            onChange={(e) => { setProductDescription(e.target.value) }}
                            value={product_description}
                        />
                        <br />

                        <input
                            type="number"
                            className="form-control"
                            placeholder="Enter the product cost"
                            required
                            onChange={(e) => { setProductCost(e.target.value) }}
                            value={product_cost}
                        />
                        <br />
                        <label htmlFor="" className="form-label">Product Category</label>

                        <select
                            className="form-select"
                            onChange={(e) => { setProductCategory(e.target.value) }}
                        >
                            <option value="">Select Category</option>
                            <option value="xiaomi">Redmi</option>
                            <option value="samsung">samsung</option>
                            <option value="tecno">tecno</option>
                            <option value="infinix">infinix</option>
                            <option value="oppo">oppo</option>
                            <option value="vivo">vivo</option>
                            <option value="huawei">Huawei</option>
                        </select>
                        <label htmlFor="" className="form-label">Product image</label>

                        <br />
                        <input
                            type="file"
                            className="form-control"
                            placeholder="select a product_image"
                            required
                            accept="image/*"
                            onChange={(e) => { setProductImage(e.target.files[0]) }} />
                        <br />
                        <button className="btn btn-danger">Add product</button>

                    </fieldset>
                </form>
            </div>

        </div>
    );
}
export default AddProductComponent;