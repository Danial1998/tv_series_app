const port=3000;
var express=require("express");
var app=express();
var request=require("request");
app.set('view engine', 'ejs');
app.use(express.static("views"))


app.get("/",function(req,res){
	res.render("search");
});

app.get("/results",function(req,res){
	var name=req.query.search;
	var options={
		url:"http://www.omdbapi.com/?t="+name+"&plot=full&apikey=67703189",
		 // proxy:"http://172.16.199.40:8080"
	}
	request(options,function(error,response,body){
		if(!error && response.statusCode==200){
			var data=JSON.parse(body);
			res.render("data",{data:data});
		}
	});
});

app.listen(port, () => console.log(`Movie app listening on port ${port}!`));