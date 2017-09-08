let Client = require('node-rest-client').Client;
let client = new Client();


exports.handler = function (event, context) {
    let token_request_args = {
        data: {
            "client_id": process.env.FORGE_CLIENT_ID,
            "client_secret": process.env.FORGE_CLIENT_SECRET,
            "grant_type": "client_credentials",
            "scope": "viewables:read",
        },
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    };

    client.post("https://developer.api.autodesk.com/authentication/v1/authenticate", token_request_args, function (token_data) {
        context.succeed(token_data);
    });
}