import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getUser ,  getToken} from "../services/authorize";
const FormComponent = ()=>{
    const [state , setState] = useState({
        title:"",
        author:getUser()
    });
    const {title , author} = state;

    const [content , setContent] = useState('');
    
    // assign values in sttate
    const inputValue = name=>event=>{
        setState({...state , [name]: event.target.value});
    }
    const submitContent = (event) =>{
        setContent(event);
    }

    const submitForm = (e)=>{
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}/create` , {title , content , author} , {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        })
        .then(res =>{
            Swal.fire({title: "แจ้งเตือน",text: "บันทึกข้อมูลเรียบร้อย",icon: "success"});
            setState({...state , title:"" , author:""})
            setContent("");
            })
          .catch(err => {Swal.fire({
            icon: "error",
            title: "แจ้งเตือน",
            text: err.response.data.error
          })})
    }
    return(
        <div className="container p-5">
            <NavbarComponent></NavbarComponent>
            <h1>เขียนบทความ</h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="">ชื่อบทความ</label>
                    <input type="text" className="form-control" value={title} onChange={inputValue("title")}/>
                </div>
                <div className="form-group">
                    <label htmlFor="">รายละเอียดบทความ</label>
                    <ReactQuill value={content} onChange={submitContent} theme="snow" 
                    className="pb-5 mb-3" placeholder="เขียนรายละเอียด"/>
                
                </div>
                <div className="form-group">
                    <label htmlFor="">ผู้แต่ง</label>
                    <input type="text" className="form-control" value={author} onChange={inputValue("author")}/>
                </div>
                <br />
                <input type="submit" value="บันทึก" className="btn btn-primary"/>
            </form>
        </div>
    )
};

export default FormComponent;