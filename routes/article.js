const express = require('express');
const Article=require('./../models/articles')
const router = express.Router()
router.get('/new', function (req, res) {
    res.render("articles/new",{article:new Article(),fail:""})
});
router.delete('/:id', async function (req, res) {
    let article=await Article.findByIdAndDelete(req.params.id)
    res.redirect("/")
});    
router.get('/:slug',async (req,res)=>{  
    let article=await Article.findOne({slug:req.params.slug})
   if(article==null)
   {
       res.redirect('/')
   }
    res.render('articles/show',{article:article})
})
router.get("/edit/:id",async (req,res)=>{
    let article=await Article.findById(req.params.id)
    res.render("articles/edit",{article:article})
})
router.post("/",async function (req, res) {
       let mydata=new Article({
           title:req.body.title,
           description:req.body.description,
           markdown:req.body.markdown
    })
    try{
        mydata=await mydata.save()
       // res.send("done")
        res.redirect(`/articles/${mydata.slug}`)
    }
    catch(e){
        console.log(e)
        res.render('articles/new',{article:mydata,fail:"Data Cant be Saved try Again"})
    }
    // res.send("suceess")
})
router.put("/:id",async (req,res)=>{
    let article=await Article.findById(req.params.id);
    article.title=req.body.title;
    article.description=req.body.description;
    article.markdown=req.body.markdown;
    try{
        article=await article.save()
        res.redirect(`/articles/${article.slug}`)
    }
    catch(e){
        console.log(e)
        res.render('articles/edit',{article:article})
    }
});
module.exports = router;