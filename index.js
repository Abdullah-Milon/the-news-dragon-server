const express = require('express'); 
const app = express();  
const port = process.env.PORT || 5000;
const cors = require('cors');

//-----------1----------

const categories = require('./data/categories.json'); // 2
const news = require('./data/news.json');

app.use(cors());  ////3

app.get('/', (req, res) =>{     ///4
    res.send('Dragon is running')
});

app.get('/categories',(req, res) =>{ ///5
    res.send(categories);
}) 

/* 1.  all news  */
app.get('/news', (req, res) =>{
    res.send(news);
})


/* 2.  if we get specific news id   6 */
app.get('/news/:id', (req, res) =>{
    const id = req.params.id;
    // console.log(id);
    const selectedNews = news.find(n=> n._id === id);
    res.send(selectedNews)
})

//3.   magic + hard term 7
app.get('/categories/:id',(req, res) =>{
    const id = parseInt(req.params.id);
    // console.log(id);
    if(id ===0){
        res.send(news)
    }
    else{
        const categoryNews = news.filter(n => parseInt(n.category_id) === id);
        res.send(categoryNews);
    }
})

app.listen(port, () =>{
    console.log(`Dragon API is running on port : ${port}`)
})