const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require("./routes/posts");

const app = express();

mongoose.connect("mongodb+srv://utilisateur:ZFWX4aaNXbnBP9a8@clustermongodb-1-wofd9.gcp.mongodb.net/node-angular?retryWrites=true&w=majority")
	.then(() => {
		console.log('Connecté à la base de données');
	})
	.catch(() => {
		console.log('Connexion en erreur');
	});

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extends: false}));

app.use((req,res,next) => {
	res.setHeader('Access-Control-Allow-Origin', "*");
	res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
	res.setHeader('Access-Control-Allow-Methods', "GET, POST, PUT, PATCH, DELETE, OPTIONS");
	next();
});

app.use("/api/posts", postsRoutes);

module.exports = app;