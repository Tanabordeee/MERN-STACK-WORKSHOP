import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken } from "../services/authorize"
const UpdateComponent = ()=>{
    const [state , setState] = useState({
        title:"",
        content:"",
        author:"",
        slug:""
    });
    const {title, author} = state;

    const [content , setContent] = useState('');
    const { slug } = useParams();
    const submitContent = (event) =>{
        setContent(event);
    }
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`).then(response =>{
            const {title , content , author , slug} = response.data[0];
            setState({...state , title, author , slug});
            setContent(content);
        }).catch(err=>{console.log(err)});
    } , [])
    // assign values in sttate
    const inputValue = name=>event=>{
        setState({...state , [name]: event.target.value});
    }
    const showUpdateForm = ()=>(
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
        <input type="submit" value="อัพเดต" className="btn btn-primary"/>
    </form>
    )
    const submitForm = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content, author, slug } , {
            headers:{
                authorization:`Bearer ${getToken()}`
            }
        })
            .then(res => {
                Swal.fire({
                    title: "แจ้งเตือน",
                    text: "อัพเดตข้อมูลเรียบร้อย",
                    icon: "success"
                });
                const { title, content, author } = res.data;
                setState({ ...state, title, author});
                setContent(content);
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "แจ้งเตือน",
                    text: err.response.data.error
                });
            });
    };
    return(
        <div className="container p-5">
            <NavbarComponent></NavbarComponent>
            <h1>อัพเดตบทความ</h1>
            {showUpdateForm()}
        </div>
    )
};

export default UpdateComponent;