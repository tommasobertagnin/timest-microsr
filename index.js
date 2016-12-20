var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/:dateValue', function(req, res) {
  const resObj = { unix: null, natural: null }, value = req.params.dateValue;

  if (validDateStr(value)) {
    resObj.unix = new Date(value).getTime() / 1000;
    resObj.natural = new Date(value).toDateString();
  }
  else if (validUnix(value)) {
    resObj.unix = Number(value);
    resObj.natural = new Date(value * 1000).toDateString();
  }
  res.type('json');
  res.send(resObj);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// helpers

function validUnix (UNIX_timestamp) {
  UNIX_timestamp = typeof UNIX_timestamp === 'number' ?
                     UNIX_timestamp : Number(UNIX_timestamp);
  const max = new Date().getTime() / 1000; // convert to seconds
  const min = new Date('1972-01-01 00:00:01').getTime() / 1000; // seconds

  return UNIX_timestamp && UNIX_timestamp >= min && UNIX_timestamp <= max;
}

function validDateStr (DATE_string) {
  return new Date(DATE_string).getTime() > 0;
}
