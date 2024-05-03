import NavbarComponent from "./components/NavbarComponent";
import axios  from "axios";
import { useState  , useEffect} from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import React from 'react';
import HTMLParser from 'html-react-parser';
import { getUser , getToken } from "./services/authorize";
function App() {
  const [blogs , setBlogs] = useState([]);
  const fetchData = ()=>{
    axios.get(`${process.env.REACT_APP_API}/blogs`)
    .then(response => setBlogs(response.data))
    .catch(error => console.log(error));
  }
  useEffect(()=>{
    fetchData();
  } , [])

  const confirmDelete = (slug) =>{
    Swal.fire({
      title:"คุณต้องการลบบทความหรือไม่",
      icon:"warning",
      showCancelButton:true
    }).then(result =>{
      if(result.isConfirmed){
        axios.delete(`${process.env.REACT_APP_API}/blog/${slug}` , {
          headers:{
              authorization:`Bearer ${getToken()}`
          }
      }).then(res=>{
          Swal.fire("Deleted!" , "ลบบทความเรียบร้อย" , "success")
          fetchData()
        }).catch(err=>{console.log(err)});
      }
    })
    
  }
  return (
    <div className="container p-5">
      <NavbarComponent></NavbarComponent>
      {blogs.map((blog, index) => (
        <div className="row" key={index} style={{borderBottom:`1px solid silver`}}>
          <div className="col pt-3 pb-2">
                <Link to={`/blog/${blog.slug}`}>
                <h2>{blog.title} </h2> 
                </Link>
                <div className="pt-3">{HTMLParser(blog.content.substring(0,250))}</div>
                <p className="text-muted">ผู้เขียน : {blog.author} , เผยเเพร่เมื่อ : {new Date(blog.createdAt).toLocaleString()}</p>
                {
                  getUser() && (
                    <div>
                    <Link className="btn btn-outline-success" to={`/blog/update/${blog.slug}`}>UPDATE</Link> &nbsp;
                    <button className="btn btn-outline-danger" onClick={()=>{confirmDelete(blog.slug)}}>DELETE</button>
                    </div>
                  )
                }
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
