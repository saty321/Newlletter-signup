const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/", function(req, res){
    
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

   const data = {
        members: [
            {
               email_address: email,
               status: "subscribed",
               merge_fields:{
                FNAME: firstName,
                LNAME: lastName,
             }
        }
      ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/414ce977d4";

    const options = {
        method: "POST",
        auth: "satyam:47976fcead1fa822be06dd2327c8b206-us21"
    }

    const request =  https.request(url, options, function(response){

        console.log(response.statusCode);
        if(response.statusCode === 200){
            res.sendFile(__dirname +"/success.html");
        } else{
            res.sendFile( __dirname + "/failure.html")
        }

        response.on("data",function(response){
        // console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


    
    // console.log(firstName + " " + lastName + " " + email);
});


app.post("/failure", function(req, res){
res.redirect("/");
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port 3000");
})

//47976fcead1fa822be06dd2327c8b206-us21 mailchamp id
//414ce977d4 audiance id