// server.js

// set up ========================
var express = require('express');
var app = express(); // This is an express ap
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)

// options =================
var argv = require('optimist')
    .default('port', 8080)
    .argv;
// configuration =================

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// static stuff -------------------------------------------------------------
app.use(express.static('app'));
app.use(express.static('server/rdf'));

// listen (start app with node server.js) ======================================
app.listen(argv.port);
console.log("App listening on port " + argv.port);

// Load store ---------------------------------------------------------------------

var rdfstore = require('rdfstore');
var jsonld = require('jsonld');
fs = require('fs');

var context;
fs.readFile('./server/rdf/context.json', 'utf8', function (err, data) {
    if (!err) {
        context = JSON.parse(data);
    } else {
        console.error(err);
    }
});

// TODO do this stuff using federation and indexes.

var store;
store = rdfstore.create(function (err, store) {
    if (!err) {
        store.execute('LOAD <https://raw.githubusercontent.com/cristianvasquez/BeliefTaggerData/alice/catalogAlice/catalog.ttl> INTO GRAPH <alice>', function(err){ console.error(err); });
        store.execute('LOAD <https://raw.githubusercontent.com/cristianvasquez/BeliefTaggerData/bob/catalogBob/catalog.ttl> INTO GRAPH <bob>', function(err){ console.error(err);  });
        store.execute('LOAD <https://raw.githubusercontent.com/cristianvasquez/BeliefTaggerData/master/catalog/catalog.ttl> INTO GRAPH <kernel>', function(err){ console.error(err); });

        store.graph(function (err, graph) {
            if (err) {
                return console.error(err);
            }
            var ntSerialization = graph.toNT();
            console.log(ntSerialization);
        });
    }
});

//fs.readFile('./server/rdf/federation.ttl', 'utf8', function (err, data) {
//    store = rdfstore.create(function (err, store) {
//        if (!err) {
//            store.load('text/turtle', data, function (err, results) {
//
//                console.log("Successfully fetched %d triples from local", results);
//            });
//        } else {
//            console.error(err);
//        }
//    });
//});
// api ---------------------------------------------------------------------

function serve(ntSerialization, res) {
    jsonld.fromRDF(ntSerialization,
        {format: 'application/nquads'},
        function (err, doc) {
            if (err) {
                return console.error(err);
            }
            jsonld.compact(doc, context, function (err, compacted) {
                if (err) {
                    return console.error(err);
                }
                res.json(compacted);
            });
        });
};

app.get('/api/nodes', function (req, res) {
    console.log("Retrieving known nodes");
    store.graph(function (err, graph) {
        if (err) {
            return console.error(err);
        }
        var ntSerialization = graph.toNT();
        serve(ntSerialization, res);
    });
});