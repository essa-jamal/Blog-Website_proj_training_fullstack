const express=require('express');
// app express
const app=express();
//register view engine
app.set('view engine','ejs');
//app.set('views','myviews');

//liten for request
app.listen(3000,()=>{
    console.log('Server Listening for port 3000')
});
app.use((req,res,next)=>{
    console.log('new request made:')
    console.log('host:',req.hostname);
    console.log('path:',req.path);
    console.log('method:',req.method);
    next();
});

app.use((req,res,next)=>{
    console.log('in the next midleware:')
    next();
});
app.get('/blogs',(req,res)=>{
    const blogs=[
{title:'Youshi finds eggs',snippet:'Lorem ipsum dolor sit amet consectetur'},
{title:'Mario finds stars',snippet:'Lorem ipsum dolor sit amet consectetur'},
{title:'How to defeat bowser',snippet:'Lorem ipsum dolor sit amet consectetur'},

    ];
    res.render('index',{title:'Home',blogs});
});


app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.use((req,res,next)=>{
    console.log('after root midleware:')
    next();
});
app.get('/about',(req,res)=>{
    res.render('about',{title:'About'});
});

app.get('/blogs/create',(req,res)=>{
    res.render('create',{title:'Create a new Blog'});
});
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
});