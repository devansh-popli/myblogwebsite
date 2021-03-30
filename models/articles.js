const mongoose = require('mongoose')
const slugify = require('slugify')
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    markdown: { 
        type: String, 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        required:true,
        type:String,
        unique:true
    }
})
articleSchema.pre('validate',function(next){
if(this.title)
{
    this.slug=slugify(this.title,{lower:true,strict:true})
}
    next() 
});
const Article = mongoose.model('Article', articleSchema);
module.exports = Article;