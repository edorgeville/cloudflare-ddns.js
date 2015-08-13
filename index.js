var express = require('express');
var app = express();

var config = {
    apiKey: process.env.API_KEY,
    email: process.env.EMAIL,
    secret: process.env.SECRET,
    domain: process.env.DOMAIN,
    subdomain: process.env.SUBDOMAIN
}

var cloudflare = require('cloudflare').createClient({
    email: config.email,
    token: config.apiKey
});

app.get('/:auth/:ip', function(req, res, next){
    console.log('Recieved request');
    if (req.params.auth == config.secret){
        console.log('Secret match');
        if(config.subdomainId){
            console.log('Already have subdomain id');
            changeIp(req.params.ip, res);
        }
        else{
            console.log('Searching subdomain id');
            cloudflare.listDomainRecords(config.domain, function(err, response){
                console.log('Got records for domain : ' + config.domain);
                // Check all records for domain
                for (id in response){
                    // Subdomain found
                    var record = response[id];
                    if(record["display_name"] == config.subdomain){
                        config.subdomainId = record["rec_id"];
                        console.log('Found record, id is ' + config.subdomainId);
                    }
                }
                if(config.subdomainId){
                    changeIp(req.params.ip, res);
                }
                // No existing subdomain
                else{
                    console.log('Did not find any matching record');
                    createIp(req.params.ip, res);
                }
            });
        }
    }
});

function changeIp(ip, res){
    console.log('Changing IP');
    cloudflare.editDomainRecord(config.domain, config.subdomainId, {
        type: "A",
        name: config.subdomain + "." + config.domain,
        content: ip,
        ttl: 1
    }, function(err, response){
        if(err){
            console.log('Got error : ' + err);
        }
        else{
            finish(res, ip);
        }
    });
}

function createIp(ip, res){
    console.log('Setting IP');
    cloudflare.addDomainRecord(config.domain, {
        type: "A",
        name: config.subdomain + "." + config.domain,
        content: ip,
        ttl: 1
    }, function(err, response){
        if(err){
            console.log('Got error : ' + err);
        }
        else{
            finish(res, ip);
        }
    });
}

function finish(res, ip){
    var mess = "IP " + ip + " set for domain " + config.subdomain + "." + config.domain + " !";
    console.log(mess);
    res.send(mess);
}


var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});