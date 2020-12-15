var bodyParser=require('body-parser');

var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://useraman:useraman@amanchawlacluster-ykolf.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('connected to database');
});

var todoschema= new mongoose.Schema({
    item:String
});

var Todo=mongoose.model('Todo',todoschema);


//var data=[{item:"do task1"},{item:"do task2"},{item:"do task3"}];

var urlencodedParser= bodyParser.urlencoded({extended:false});

module.exports= function(app){

app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
        if (err) throw err;
        res.render('todo',{todos:data});
    });
});

app.post('/todo',urlencodedParser,function(req,res){
    var newTodo =Todo(req.body).save(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});

app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
        if (err) throw err;
        res.json(data);
    });
});

};