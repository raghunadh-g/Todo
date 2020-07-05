const express=require("express");
const bodyParser=require("body-parser");
const date=require(__dirname+"/date.js");

const app=express();
const items=["work","sports","movies","about"];
const workItems=[];
const sports=[];
const movies=[];


app.set('view engine',"ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  const day=date.getDate();
  res.render("list", { listTitle: day, newlistItem: items });
});

app.post("/",function(req,res){
  const item=req.body.newitem;
  if(req.body.list === "WORK"){
    workItems.push(item);
    res.redirect("/work");
  }else if(req.body.list === "Sports"){
    sports.push(item);
    res.redirect("/sports");
  }
  else if(req.body.list === "Movies"){
    movies.push(item);
    res.redirect("/movies");
  }
  else{
    items.push(item);
    res.redirect("/");
  }
});


app.get("/work",function(req,res){
  res.render("list",{listTitle:"WORK LIST",newlistItem:workItems});
});

app.get("/sports",function(req,res){
  res.render("list",{listTitle:"Sports",newlistItem:sports});
});

app.get("/movies",function(req,res){
  res.render("list",{listTitle:"Movies",newlistItem:movies});
});

app.get("/about",function(req,res){
  res.render("about");
});

app.listen(3000,function(){
    console.log("server started on port 3000");
});