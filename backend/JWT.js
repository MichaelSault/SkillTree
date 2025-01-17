const toBase64 = obj => {
    // converts the obj to a string
    const str = JSON.stringify (obj);
    // returns string converted to base64
    return Buffer.from(str).toString('base64');
 };

const replaceSpecialChars = b64string => {
    // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
    return b64string.replace (/[=+/]/g, charToBeReplaced => {
        switch (charToBeReplaced) {
            case '=':
                return '';
            case '+':
                return '-';
            case '/':
                return '_';
            default:
        }
    });
};

// generate the jwt header
const header = {
    alg: 'HS256',
    typ: 'JWT',
};

//import the crypto module
const crypto = require('crypto');
const createSignature = (jwtB64Header, jwtB64Payload, secret) => {
    //creates a hash based message auth code using sha256
    let signature = crypto.createHmac('sha256', secret);

    //join the header and payload
    signature.update(jwtB64Header + '.' + jwtB64Payload);

    //convert signature to base64
    signature = signature.digest('base64');

    //clean the signature and remove any special characters
    signature = replaceSpecialChars (signature);
    return signature;
}

const getJWT = async(userData, secret) => {
    console.log("running getJWT =============================================================");
    console.log(userData);
    //create the header
    const b64Header = toBase64 (header);
    const jwtB64Header = replaceSpecialChars(b64Header);
    console.log ("the header is: ", jwtB64Header); 
    //OUTPUTS the header is: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    
    //create payload
    const payload = {
        iss: 'skilltree',    //name of the server that issued the token
        exp: 60*60*24,      // sets to expire in 24hours

        //user data
        userID: userData.userID,
        email: userData.email,
        password: userData.password,
        username: userData.username
    }

    // converts payload to base64
    console.log(payload);
    const b64Payload = toBase64(payload);
    const jwtB64Payload = replaceSpecialChars(b64Payload);
    console.log ("the payload is: ", jwtB64Payload);

    //create signature
    const signature = createSignature(jwtB64Header, jwtB64Payload, secret);
    console.log("the signature is: ", signature);
    //OUTPUTS the signature is:    bWLt85oF80pZ6QfHF9BjgjvVolR3DD6Mv2ixS47nmHo

    //combine all parts into a JWT Token
    const jasonWebToken = jwtB64Header + '.' + jwtB64Payload + '.' + signature;
    console.log("the JWT is: ", jasonWebToken);

    return(jasonWebToken);
}

const decodeJWT = async(JWT) => {
    console.log("does this run?");
    const token = JWT;
    const tokenDecodablePart = token.split('.')[1];
    console.log("decodable part: ", tokenDecodablePart);
    const decoded = Buffer.from(tokenDecodablePart, 'base64').toString();
    console.log(decoded);

    return(decoded);
}

const verifyJWT = async(JWT, secret) => {
    const signature = JWT.split('.')[2];
    console.log("Signature to Verify: ", signature);
    
    const header = JWT.split('.')[0];
    console.log("Header: ", header);
    const decodedHeader = Buffer.from(header, 'base64').toString();
    console.log("Decoded Header: ", decodedHeader);

    const payload = JWT.split('.')[1];
    console.log("Payload: ", payload);
    const decodedPayload = Buffer.from(payload, 'base64').toString();
    console.log("Decoded Payload: ", decodedPayload);

    //create signature
    const newSignature = createSignature(header, payload, secret);
    console.log("Signature should be: ", signature);
    //OUTPUTS the signature is:    bWLt85oF80pZ6QfHF9BjgjvVolR3DD6Mv2ixS47nmHo

    console.log("Verifying Signature...");
    if (signature === newSignature){
        console.log("SIGNATURE VALIDATED");
        return true;
    }  else {
        console.log("INVALID SIGNATURE!");
        return false;
    }
}

module.exports = {
    getJWT,
    decodeJWT,
    verifyJWT
}