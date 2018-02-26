// pour charger notre application 
var express = require('express');

var mongojs = require('mongojs');

// utilisation body-paser 
var bodyParser = require('body-parser');

// utilisation de notre base de données des serveur
var db= mongojs('items', ['items']); 

// base de données configuration 
var db2 = mongojs('configuration',['configuration'])

var app = express();

app.use(express.static(__dirname+"/public"));

app.use(bodyParser.json());

// recuperation de puis configuration 

app.get('/items', function(req, res){

    console.log("I received request from controller ! ")

    db.items.find(function(err, docs){
        console.log(docs);
        res.json(docs);
    })
/*     var items = [{
		id: 1,
		label: 'http://geoprocessing.demo.52north.org:8080/wps/WebProcessingService',
	},
	{
		id: 2,
		label: 'https://geobretagne.fr/geoserver/ows',
	}
	];
    res.json(items); */
});

app.get('/configuration', function(req, res){
    
        console.log("I received request1 from controller ! ")
    
        db2.configuration.find(function(err, docs){
            console.log(docs);
            res.json(docs);
        })
    });

// ajout dans la base de données configuration (cas une seule entrées) 
app.post('/configuration/:id', function(req, res){
    var process = req.params.id
    //var input = req.params.valtext
    //var nomparam = req.params.nominput
    db2.configuration.insert({process, inputs : req.body.requestinput}, function(err, doc){
    //console.log("coucou!!!!!!!!!"+input);
    res.json(doc);
    })
});

// ajout dans la base de données configuration ( cas plusueurs entrées)
app.post('/configuration2/:id', function(req, res){
    var process = req.params.id
    console.log("massi!!",req.body)
    db2.configuration.insert({process, config:req.body.bool, inputs:req.body.requestinput}, function(err, doc){
 //   console.log("coucou!!!!!!!!!"+inputs);
    res.json(doc);
    })
});

// reception ajout serveur 
app.post('/items', function(req, res){
      var str = req.body 
      console.log("coucou!!!!!!!!!"+str);
      db.items.insert(req.body, function(err, doc){
      res.json(doc);
      })
});

//update
//reception ajout serveur 
app.put('/items/:id', function(req, res){
      var id = req.params.id 
      console.log("ppp"+req.body.id);
      db.items.findAndModify({query: {_id: mongojs.ObjectId(id)},
      update: {$push: {process:{name:req.body.process}}},
  new:true}, function(err,doc){
      res.json(doc);
  });

});

// suppression serveur
app.delete('/items/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    db.items.remove({_id:mongojs.ObjectId(id)}, function (err, doc){
        res.json(doc);
    })
})

/*
app.post('/items2/:id', function(req, res){
    var id = req.params.id;
    console.log("yes"+id);
    db.items.update({_id: mongojs.ObjectId(id)},{ $unset: { process: 1 }}, function (err, doc){
        res.json(doc);
    })
})*/

// suppression des process
app.post('/items2/:id/:process', function(req, res){
    var id = req.params.id;
    var proc = req.params.process
    console.log("yes"+id);
    db.items.update({_id: mongojs.ObjectId(id)},{ $pull: { process: {name : proc} }}, function (err, doc){
        res.json(doc);
    })
})


// affichage sur le port 8080
app.listen(8082)
console.log("Server is running on port 8082")





