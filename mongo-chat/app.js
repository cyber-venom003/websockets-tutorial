const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Bring in the routes
app.use('/user' , require('./routes/user'));

//Setup error handlers
const errorHandlers = require('./handlers/errorHandlers');
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseErrors);
app.use(errorHandlers.developmentErrors);
if (process.env.ENV === "DEVELOPMENT"){
    app.use(errorHandlers.developmentErrors);
} else {
    app.use(errorHandlers.productionErrors);
}

module.exports = app;

