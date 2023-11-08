const express = require("express")
const app=express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")
const templatePath = path.join(__dirname,'./templates')
require('dotenv').config()
const PORT = process.env.PORT || 3000 ;

 

app.use(express.static('.'));

 
app.use(express.json()) 
app.set("view engine", "hbs")
app.set("views",templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.render("login")
})

app.get("/signup",(req,res)=>{
    res.render("signup") 
})


app.post("/signup", async (req, res) => {
    const { name, email, password, tel,msgContent } = req.body;
  
    if (!name || !email || !password || !tel) {
      return  res.render('signup', { message: "Please fill in all the required fields." });
    }
 
    const existingUser = await collection.findOne({ email: email });

  if (existingUser) {
    return res.render('signup', { message: "Email is already registered. Please use a different email." });
  }
  if (tel.length !==10){
    return  res.render('signup', { message: "Mobile Number must be of 10 digits" });
  }

    const data = {
      name,
      email,
      password,
      tel,
      msgContent
    };
  
    await collection.insertMany([data]);
  
    res.render("login")
    // res.redirect("https://nayepankh.com/");
  });


  
app.post("/login",async (req,res)=>{
   
   try{
    const check = await collection.findOne({email:req.body.email})
   
   if(check.password===req.body.password){
    res.redirect("https://nayepankh.com/") 
   }
    else{
        res.render('login', { message: 'Password Incorrect Try Again' });
    }
}
    catch{
        res.render('login', { message: 'Invalid Credentials Try Again' });
    }
}) 


app.listen(PORT,()=>{
    console.log("port connected");
})
 