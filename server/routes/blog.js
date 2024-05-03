// blog.js
const express = require('express');
const router = express.Router();
const { create , get_blogs , single_blog , remove , update} = require("../controllers/blogController");
const { requireLogin } = require("../controllers/authConroller");



router.post("/create",requireLogin, create);

router.get("/blogs",get_blogs);
router.get("/blog/:slug", single_blog);

router.delete("/blog/:slug",requireLogin , remove);
router.put("/blog/:slug",requireLogin,update);
module.exports = router;
