var FeedParser = require('feedparser');
var request = require('request');

var req = request('http://www.appledaily.com.tw/rss/newcreate/kind/rnews/type/new')

var feedparser = new FeedParser();

req.on('error', function (err) {
    console.log(err); 
});

req.on('response', function(res) {
    var stream = this;
    if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
    stream.pipe(feedparser);
});

feedparser.on('error', function(err) {
    console.log(err);
});

feedparser.on('readable', function() {
    var stream = this;
    var meta = this.meta;
    var item;
    
    while(item = stream.read()) {
        console.log(item);
    }
});
