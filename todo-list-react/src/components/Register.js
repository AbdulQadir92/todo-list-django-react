import { Link } from 'react-router-dom';
import { useState } from 'react';
import CSRFToken from './CSRFToken';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const csrftoken = CSRFToken();

    const handlePost = (e) => {
        e.preventDefault();
        fetch('register/', {
            method: 'POST',
            headers: {"Content-Type": "application/json", 'X-CSRFToken': csrftoken},
            body: JSON.stringify({username, email, password1, password2})
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.message === 'User created'){
                navigate('/');
            }
        })
    }

    return ( 
    <div className="mt-5">
        
        <div className="row mx-5">
            <div className="card shadow bg-white rounded border col-lg-5 col-sm-7 m-auto">
            <h4 className="text-center primary-color mt-2">Register</h4>
                <div className="card-body pt-0">
                    <form id="registerForm" onSubmit={handlePost}>
                        <div className="form-group">
                            <label for="username">Username</label>
                            <input 
                                type="text"
                                className="form-control form-control-sm" 
                                id="username"
                                placeholder="Enter username" 
                                required
                                value={username}
                                onChange={(e) => {setUsername(e.target.value)}}
                                 />
                            <small className="form-text text-danger d-none" id="usernameMsg">Username is already taken</small>
                        </div>
                        <div className="form-group mt-2">
                            <label for="phoneOrEmail"> Email</label>
                            <input 
                                type="email" 
                                className="form-control form-control-sm" 
                                id="phoneOrEmail"
                                placeholder="Enter email" 
                                required 
                                value={email}
                                onChange={(e) => {setEmail(e.target.value)}}
                                />
                            <small className="form-text text-danger d-none" id="phoneOrEmailMsg">Phone number or email is already taken</small>
                        </div>
                        <div className="form-group mt-2">
                            <label for="password1">Password</label>
                            <input 
                                type="password" 
                                className="form-control form-control-sm" 
                                id="password1"
                                placeholder="Enter password" 
                                required 
                                value={password1}
                                onChange={(e) => {setPassword1(e.target.value)}}
                                />
                        </div>
                        <div className="form-group mt-2">
                            <label for="password2">Confirm Password</label>
                            <input 
                                type="password" 
                                className="form-control form-control-sm" 
                                id="password2"
                                placeholder="Enter password again" 
                                required 
                                value={password2}
                                onChange={(e) => {setPassword2(e.target.value)}}
                                />
                            <small className="form-text text-danger d-none" id="passwordMsg">Passwords do not match</small>
                        </div>
                        <div className="d-flex justify-content-end">
                            <input 
                            type="submit" 
                            className="btn btn-sm secondary-btn-1 mt-2" 
                            value="Register" 
                            id="submitBtn" 
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="text-center mt-2">
            <div className="text-secondary">Already registered? <Link to="/login" className="btn-link secondary-color-2">Login</Link></div>
        </div>
    </div>
    );
}
 
export default Register;
