
const express=require('express');
const mysql = require('mysql2');

const app=express();
let conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'bicicentro',
    port:3306
});

conn.connect(function(error){
    if(error) throw error;
    console.log("Conexion exitosa base de datos");
});
app.listen(3000,function(){
    console.log("Servidor corriendo en el puerto 3000");
});
app.get("/trabajadores",function(req,res){
    conn.query("select * from trabajadores",function(error,results){
        if(error) throw error;
        res.json(results)
    });
});
app.get("/trabajadores/:id",function (req,res){
    let dni=req.params.id;
    let sql="select * from trabajadores t inner join sedes s on t.idsede=s.idsede where dni=?";
    let params=[dni];
    conn.query(sql,params,function (error,results){
        if(error) throw error;
        res.json(results);
    });
});
app.get("/trabajadores/ventas/:id",function(req,res){
    let dni=req.params.id;
    let sql="select v.fecha,inv.nombre,inv.numeroserie,m.nombre from  trabajadores t inner join ventas v on v.dniTrabajador=t.dni inner join inventario inv on inv.idinventario=v.id_inventario inner join marcas m on m.idmarca=inv.idmarca  where t.dni=?";
    let params=[dni];
    conn.query(sql,params,function (error,results){
        if(error) throw error;
        res.json(results);
    });
});
app.get("/sedes",function(req,res){
    conn.query("select * from sedes",function(error,results){
        if(error) throw error;
        res.json(results)
    });
});
app.get("/sedes/:id",function(req,res){
    let idsede=req.params.id;
    let sql="select * from sedes where idsede=?";
    let params=[idsede];
    conn.query(sql,params,function (error,results){
        if(error) throw error;
        res.json(results);
    });
});
app.get("/sedes/trabajadores/:id",function(req,res){
    let idsede=req.params.id;
    let sql="select t.nombres,t.apellidos,t.correo,t.dni,s.idsede from trabajadores t inner join sedes s on t.idsede=s.idsede where s.idsede=?";
    let params=[idsede];
    conn.query(sql,params,function (error,results){
        if(error) throw error;
        res.json(results);
    });
});