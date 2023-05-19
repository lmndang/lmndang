const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect("mongodb+srv://lmndang:nhat2601@cluster0.aga8r.mongodb.net/", {useNewUrlParser: true, useUnifiedTopology: true});

//mongodb+srv://lmndang:nhat2601@cluster0.aga8r.mongodb.net/lmndang
//mongodb+srv://lmndang:<password>@cluster0.aga8r.mongodb.net/
const projectSchema = {
  name: String,
  category: String,
  imgThumb: String,
  imgDetail: String,
  description: String,
  date: Number,
  client: String,
  tool: String,
  webLink: String,
  webName: String
}


//public/img/portfolio/thumb/project-1.png

const Project = mongoose.model("Project", projectSchema);

// const tinDog = new Project(
//   {
//     name: "To Do List",
//     category: "web-application",
//     imgThumb: "img/portfolio/thumb/project-3.png",
//     imgDetail: "img/portfolio/large/project-3/1.png",
//     description: "To-Do List is an application that you can save what you need to do every day. The application reminds you of what needs to be done and helps you manage things. The application uses server-side coding (Express.js) to handle requests from the user. To-Do List also using MongoDB to store your list, and you don't have to worry about losing data. You can make a new list by using the custom route, create whatever you want.",
//     date: 2021,
//     client: "Personal Project",
//     tool: "Node.js, Express, MongoDB",
//     webLink: "https://todolist2601.herokuapp.com/",
//     webName: "todolist2601.herokuapp.com"
//   }
// );

//tinDog.save();

app.get("/", function(req, res)
{
  Project.find({}, function(err, allProjects)
  {
    if(!err)
    {
      //console.log(allProjects)
      res.render("home", {projects: allProjects});
    }
    else
    {
      console.log(err);
    }
  });
});

app.get('*', function(req, res){
  res.render("error");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port " + port);
});