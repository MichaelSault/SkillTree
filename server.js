const express = require('express'),
    dbOperation = require('./backend/dbOperations'),
    JWT = require('./backend/JWT'),
    cors = require('cors'),
    mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//eventually this should be removed due to security issues but while testing I'll leave it
mongoose.connect(process.env.DB_CONN).catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Express is here");
});

////////////////////////////////////////////////////
////////////////db Functions////////////////////////
////////////////////////////////////////////////////

//adds a new user to the database
app.post("/SignUpUser", async (req, res) => {    
    const result = await dbOperation.signUpUser(req.body);
    console.log("Returned From Query");
    res.send(result);
});

//checks is a user exists in the database
app.post('/loginUser', async(req, res) => {
    const result = await dbOperation.loginUser(req.body);
    console.log("Returned From Query --->", result);
    res.send(result);
});


////////////////////////////////////////////////////
////////////////JWT Functions///////////////////////
////////////////////////////////////////////////////

//returns data from JWT payload
app.post('/decodeJWT', async(req, res) => {
    //set Secret
    const secretKey = process.env.JWT_SECRET;

    //set JWT
    const jwtToVerify = req.body.Token;
    //validate JWT
    const validated = await JWT.verifyJWT(jwtToVerify, secretKey);
    console.log(validated);
    //if valid, decode the payload
    if (validated){
        console.log("JWT to decode: " + jwtToVerify);
        const decoded = await JWT.decodeJWT(jwtToVerify);
        console.log("decoded token: " + decoded);
        res.send(decoded);
    } else {
        throw new Error("Invalid Signature!");
    }
});

app.post('/JWT', async(req, res) => {
    console.log("==========================================called JWT on server.js==========================================");
    //set Secret
    const secretKey = process.env.JWT_SECRET;

    console.log(req.body);
    const JasonWebToken = await JWT.getJWT(req.body, secretKey);
    console.log("JWT Returned by the function: " + JasonWebToken);
    const decoded = await JWT.decodeJWT(JasonWebToken);
    console.log("decoded token: " + decoded);
    console.log(req.body);
    const validated = await JWT.verifyJWT(JasonWebToken, secretKey);
    console.log(validated);
    res.send(JasonWebToken);

});

//returns true if valid JWT
app.post('/verifyJWT', async(req, res) => {
    //set Secret
    const secretKey = process.env.JWT_SECRET;

    const jwtToVerify = req.body.Token;
    console.log("JWT to verify: " + jwtToVerify);
    const validated = await JWT.verifyJWT(jwtToVerify, secretKey);
    console.log(validated);
    res.send(req.body); 
});


app.listen(3001, function() {
    console.log("Server is running");
});