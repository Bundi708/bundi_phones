import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const SignUpComponent = () => {

    let [username, updateUsername] = useState("");
    let [email, updateEmail] = useState("");
    let [phone, updatePhone] = useState("");
    let [password, updatePassword] = useState("");

    // notifyig user of either submitting, success,error
    let [loading, setLoading] = useState("");
    let [error, setError] = useState("");
    let [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        // pevent default behaviour
        e.preventDefault();

        // notify usre to wait
        setError("");
        setSuccess("");
        setLoading("submitting data! Please wait...");

        // confirm user input
        console.log(username, email, phone, password)

        // try send data to server
        try {
            // create form data 
            const user_data = new FormData();
            user_data.append("username", username);
            user_data.append("email", email);
            user_data.append("phone", phone);
            user_data.append("password", password);

            // use axios to send data to server
            const response = await axios.post("https://bundi.alwaysdata.net/api/signup", user_data)
            console.log(response)
            if (response.status === 200) {
                setSuccess(response.data.message)
                setLoading("")
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setLoading("");
        }
    }
    return (
        <div className="row justify-content-center mt-4">
             <Navbar/>
            {/* <h1>SignUp Component</h1> */}

            <div className="col-md-6 card shadow p-4">
                <h2>Sign Up</h2>
                <h5 className="text-warning">{loading}</h5>
                <h5 className="text-danger">{error}</h5>
                <h5 className="text-success">{success}</h5>
                {/* <p>Current username : {username}</p> */}

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your Username"
                            required
                            onChange={(e) => {
                                updateUsername(e.target.value);
                            }}
                            value={username}
                        />
                        <br />

                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your Email"
                            required
                            onChange={(e) => {
                                updateEmail(e.target.value);
                            }}
                            value={email}
                        />
                        <br />

                        <input
                            type="tel"
                            className="form-control"
                            placeholder="Enter your phone number"
                            required
                            onChange={(e) => {
                                updatePhone(e.target.value);
                            }}
                            value={phone}
                        />
                        <br />

                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your Password"
                            required
                            onChange={(e) => {
                                updatePassword(e.target.value);
                            }}
                            value={password}
                        />

                        <button className="btn btn-danger">Sign Up </button><br />
                        <Link to="/signin"> Already have an account? Sign In</Link>


                    </fieldset>
                </form>
            </div>
        </div>
    );
}
export default SignUpComponent;