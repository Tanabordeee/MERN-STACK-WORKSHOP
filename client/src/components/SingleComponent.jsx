import { useParams } from "react-router-dom";
// เอา params ต้องใช้ useParams ใน React V18
import axios from "axios";
import { useState , useEffect} from 'react';
import NavbarComponent from "./NavbarComponent";
import React from 'react';
import HTMLParser from 'html-react-parser';
const SingleComponent = () => {
    const { slug } = useParams();
    const [blog , setBlog] = useState('');
    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API}/blog/${slug}`).then((res)=>{
            setBlog(res.data);
        }).catch((err)=>{
            console.log(err);
        });
    },[slug])
    const blogObject = blog[0];
    return (
        <div className="container p-5">
            <NavbarComponent/>
            {blogObject && 
            <div>
                <h1>{blogObject?.title}</h1>
                <div className="pt-3">{HTMLParser(blogObject?.content)}</div>
                <p className="text-muted">ผู้เขียน : {blogObject?.author} เผยแพร่ : {new Date(blogObject?.createdAt).toLocaleString()}</p>
            </div>}
        </div>
    );
    
}

export default SingleComponent;
