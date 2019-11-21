const express = require('express');
const mysql = require('mysql');
const morgan = require('morgan');
const so = require('os');
const stream = require('stream');

/**
 * cargamos los datos de la base de datos
 */

const coneccion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'correlativas'
});

/**
 * conectamos a la base de datos
 */

coneccion.connect((err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Base de datos conectada!!");
    }
});

/**
 * creamos nuestra primer ruta
 */

var app = express();

/**
 * cabeceras CORS
 */

app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use('/static', express.static('public'));

app.use('/memo', express.static('public/memoria.html'));

app.get('/', function (req, res) {
    const cosa = ['1', '2'];
    res.render('index.ejs', {cosa: cosa});
});

app.get('/datos',(req, responce)=>{
    const consulta = coneccion.query(`SELECT * FROM correlativa`,(err, res)=>{
        if(err){
            console.log(err);
        }else{
            responce.send(res);
        }
    })
});

app.get('/memoria',(req, res)=>{
    var coso = [
        {memoria: so.freemem()}
    ];
    res.send(coso);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});