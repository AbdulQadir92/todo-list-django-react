import { Link } from "react-router-dom";
import { useState } from 'react';
import CSRFToken from "./CSRFToken";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const csrftoken = CSRFToken();

    const handlePost = (e) => {
        e.preventDefault();
        fetch('login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'X-CSRFToken': csrftoken},
            body: JSON.stringify({email, password})
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.message === 'User is logged in'){
                navigate('/');
            }
        })
    } 

    return (
        <div className="mt-5">
            <div className="row mx-5">
                <div className="card shadow bg-white rounded border col-lg-5 col-sm-7 m-auto">
                    <h4 className="text-center primary-color mt-2">Login</h4>
                    <div className="card-body pt-0">
                        <form onSubmit={handlePost} id="loginForm">
                            <div className="form-group">
                                <label htmlFor="loginPhoneOrEmail">Email</label>
                                <input 
                                    type="email" 
                                    className="form-control form-control-sm" 
                                    id="loginPhoneOrEmail" 
                                    required 
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                    />
                                <small className="form-text text-danger d-none" id="loginPhoneOrEmailMsg">Email is incorrect</small>
                                <small className="form-text text-danger d-none" id="noAccountExistsMsg">No account with the given email exists</small>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    className="form-control form-control-sm" 
                                    id="password" 
                                    required 
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    />
                                <small className="form-text text-danger d-none" id="loginPasswordMsg">Or password is incorrect</small>
                            </div>
                            <div className="d-flex justify-content-end">
                                <input type="submit" className="btn btn-sm secondary-btn-1 mt-2" value="Login" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="text-center mt-2">
                <div>Not registered? <Link to="/register" className="btn-link secondary-color-2">Register</Link></div>
            </div>
        </div>
    );
}


export default Login;
