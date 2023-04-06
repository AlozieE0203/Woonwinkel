const express = require('express')
const app = express()
const mysql = require('mysql') ;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  connectionLimit: 10
})

pool.query(`select * from woonwinkel.products`, (err, res) =>{
  return console.log(res)
})

 app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
 });

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname+ '/pages/contact.html'));
  })
  app.listen(5500, () => {
    console.log("listening on http://localhost:5500");
  })
 


app.get('/',function(req,res){
  res.render('home');
});

// search function    
app.post('/search',function(req,res){
  var str = {
      stringPart:req.body.typeahead
  }

  db.query('SELECT naam FROM products WHERE naam LIKE "%'+str.stringPart+'%"',function(err, rows, fields) {
      if (err) throw err;
      var data=[];
      for(i=0;i<rows.length;i++)
      {
          data.push(rows[i].naam);
      }
      res.send(JSON.stringify(data));
  });
});