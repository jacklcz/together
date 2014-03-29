
/*
 * GET home page.
 */
var fs = require('fs')
exports.index = function(req, res){

    fs.readFile('libwebsockets-test.html', 'utf8', function(err, data) {
        if (err) {
            res.writeHead(404);
            res.end();
        }
        else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        }
    });

    //res.render('infoc', { title: 'HEHES','title_2':'GAME' });
};