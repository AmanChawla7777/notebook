var express=require('express');
var todoController = require('./controllers/todoController');

var app=express();

//set up engine
app.set('view engine','ejs');

//static files

app.use(express.static('./public'));

todoController(app);

app.listen(3000);
console.log('listening at port 3000');