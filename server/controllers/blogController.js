// blogController.js
const slugify = require('slugify');
const Blogs = require('../models/blogs');
const { v4: uuidv4 } = require('uuid');
// Save Database
exports.create = async (req, res) => {
    const {title , content , author} = req.body;
    let slug = slugify(title);


    if(!slug){
        slug = uuidv4();
    }
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"});
            break;
        case !content:
            return res.status(400).json({error:"กรุณาป้อนเนื้อหา"});
            break;
    };
    //บันทึกข้อมูล
    try{
        const blog = await Blogs.create({title , content , author , slug});
        res.json(blog);
    }catch(err){
        res.status(404).json({error:"มีบทความซ้ำกัน"});
    }
    
}

exports.get_blogs = async (req , res) =>{
    try{
        const blogs = await Blogs.find().exec();
        res.json(blogs);
    }catch(err){
        console.log(err);
    }
}

exports.single_blog = async (req , res) =>{
    const {slug} = req.params;
    try{
        const blogs = await Blogs.find({slug}).exec();
        res.json(blogs);
    }catch(err){
        console.log(err);
    }
}

exports.remove = async (req , res) =>{
    const {slug} = req.params;
    try{
        await Blogs.findOneAndDelete({slug}).exec();
        res.json({
            message:"ลบบทความเรียบร้อย"
        });
    }catch(err){
        console.log(err);
    }
}

exports.update = async (req , res) =>{
    const { slug: slugParams } = req.params;
    const { title, content, author } = req.body;
    let slug = slugify(title);
    if(!slug){
        slug = uuidv4()
    }
    try{
        const blog = await Blogs.findOneAndUpdate({ slug: slugParams } , {title, content, author , slug} , {new:true}).exec();
        res.json(blog);
    }catch(err){
        console.log(err);
    }
}