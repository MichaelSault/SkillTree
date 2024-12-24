const mongoose = require('mongoose');

//DB SCHEMA AND MODEL
const userSchema = mongoose.Schema({
    userID: String,
    username: String,
    email: String,
    password: String,
});

const Users = mongoose.model("Users", userSchema);


//DB OPERATIONS
const loginUser = async(userCredentials) => {
    console.log("logging in a user...");

    try {
        console.log(userCredentials);
        let returnedUser = await Users.find({username: userCredentials.username, password: userCredentials.password})
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedUser);
        console.log(returnedUser[0].username);

        return returnedUser[0];
    }
    catch(error) {
        console.log(error);
    }
}

const signUpUser = async(userCredentials) => {
    console.log("signing up a user...");

    try {
        console.log(userCredentials);
        let returnedUser = await Users.create({
            userID: userCredentials.userID,
            username: userCredentials.username,
            email: userCredentials.email,
            password: userCredentials.password,
        })
        .then(doc => console.log(doc))
        .catch((err) => console.log(err));

        console.log("Returned From Query: ", returnedUser);

        return returnedUser;
    }
    catch(error) {
        console.log(error);
    }
}


module.exports = {
    loginUser,
    signUpUser
}