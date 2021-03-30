const express = require('express');
const mongoose=require('mongoose');
const methodOverride = require('method-override');
var artrouter = require('./routes/article');
var app = express();
const bodyparser=require('body-parser');
const Article = require('./models/articles');
mongoose.connect('mongodb://localhost/blog',{useNewUrlParser:true,useUnifiedTopology:true})
app.use("/static",express.static("staticfiles"))
app.set('view engine', 'ejs') 
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use("/articles", artrouter);
app.get('/', async function (req, res) {
    var cards = await Article.find().sort({createdAt:'desc'})
    res.render("articles/index", { cards: cards });
});
app.use((req,res)=>{
    res.status(404).render('articles/404');
});
app.listen(5000);