import NavbarComponent from "./NavbarComponent";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate, getUser } from "../services/authorize";
import { useNavigate } from "react-router-dom";
const LoginComponent = ()=>{
    
    const navigate = useNavigate()

    const [state , setState] = useState({
        username:"",
        password:""
    });

    const {username , password} = state;
    const inputValue = name =>event=>{
        setState({...state , [name]:event.target.value})
    }

    const submitForm = (e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/login` , {username , password}).then(res =>{
            authenticate(res , ()=>navigate("/create"));
        }).catch(err => {Swal.fire({
            icon: "error",
            title: "แจ้งเตือน",
            text: err.response.data.error
          })})
    }
    useEffect(()=>{
        getUser() && navigate("/");
    },[])

    
    const [passwordVisible , setPasswordVisible] = useState(false);
    const togglePasswordVisible = ()=>{
        setPasswordVisible(!passwordVisible);
    }

    return(
        <div className="container p-5">
        <NavbarComponent></NavbarComponent>
        <h1>เข้าสู่ระบบ | Admin</h1>
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label htmlFor="">Username</label>
                <input type="text" className="form-control" value={username} onChange={inputValue("username")}/>
            </div>
            <div className="form-group">
            <label htmlFor="">รหัสผ่าน</label>
            <input type={passwordVisible ? "text" : "password"} className="form-control" id="" value={password} onChange={inputValue("password")}/>
            <button type="button" className="btn btn-secondary mt-2" onClick={togglePasswordVisible}>แสดง</button>
            </div>
            <br />
            <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary w-100"/>
        </form>
    </div>
    )
}

export default LoginComponent;