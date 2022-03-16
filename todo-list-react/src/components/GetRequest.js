import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const GetRequest = (url, updateComponent='') => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(url)
        .then(res => {
            if(!res.ok){
                throw Error("Could not fetch data");
            }
            return res.json();
        })
        .then(data => {
            setData(data.todos);
            if(data.message === "user not logged in"){
                navigate('/login');
            }
        })
        .catch(err => {
            console.log(err.message);
        })
    }, [updateComponent])

    return data
}
 
export default GetRequest;
