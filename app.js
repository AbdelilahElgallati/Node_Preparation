const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.urlencoded({extended: true}));
const Mydata = require('./models/myDataSchema');
app.set('view engine', 'ejs');
app.use(express.static('public'));


// auto refresh code
const path = require('path');
const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
const connectLivereload = require('connect-livereload');
app.use(connectLivereload());

liveReloadServer.server.once("connection", ()=> { 
    setTimeout(()=> {
        // liveReloadServer.refresh("/");
    },100);
});


// routage d'applications
app.get('/', (req, res) => {
    Mydata.find()
        .then((result) => {
            console.log("get data from MongoDB database");
            res.render("home", { mytitle: "Home page", arr: result });
        })
        .catch((err) => {
            console.error("err");
            console.error(err);
            res.render("home", { mytitle: "Home page", arr: [] }); 
        });
});

mongoose
    .connect('mongodb://127.0.0.1:27017/test')
    .then(()=>{ console.log('connecting to database'); })
    .catch(err =>  console.error('Error connecting to MongoDB:', err));

app.post('/add-user', (req,res)=>{
    const mydata = new Mydata(req.body);

    // Attente de 2 secondes avant de tenter de sauvegarder les données
    setTimeout(() => {
        mydata
            .save()
            .then(() => {
                console.log("put data in MongoDB database");
            })
            .catch(err => {
                console.log("err");
                console.log(err);
            });

        Mydata.find()
            .then((result) => {
                console.log("get data from MongoDB database");
                res.render("home", { mytitle: "Home page", arr: result });
            })
            .catch((err) => {
                console.error("err");
                console.error(err);
                res.render("home", { mytitle: "Home page", arr: [] }); 
            });
    }, 2000);

    

    
    
})



app.listen(3000, ()=>console.log('listening on port 3000'));