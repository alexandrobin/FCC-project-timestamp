var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

app.get('/api/:date?', function(req, res) {

  //Get the query
  let query = req.params.date
  //Check if we can parse the query - if the query is parsable
  let date = new Date(query)
  if (date != "Invalid Date") {
    console.log({
      query,
      unix: date.valueOf(),
      utc: date.toUTCString()
    })
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString()
    })
  }
  else if (!isNaN(parseInt(query))) {
    let date = new Date(parseInt(query))
    console.log({
      query,
      unix: date.valueOf(),
      utc: date.toUTCString()
    })
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString(),
    })
  }
  else if (query == null) {
    let date = new Date()
    console.log({
      query,
      unix: date.valueOf(),
      utc: date.toUTCString()
    })
    res.json({
      unix: date.valueOf(),
      utc: date.toUTCString()
    })
  }
  else {
    console.log({ query, error: "Invalid Date" })
    res.json({ error: "Invalid Date" })
  }

})

module.exports = app

/**You should provide your own project, not the example URL.

A request to /api/:date? with a valid date should return a JSON object with a unix key that is a Unix timestamp of the input date in milliseconds

A request to /api/:date? with a valid date should return a JSON object with a utc key that is a string of the input date in the format: Thu, 01 Jan 1970 00:00:00 GMT

A request to /api/1451001600000 should return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }

Your project can handle dates that can be successfully parsed by new Date(date_string)

If the input date string is invalid, the api returns an object having the structure { error : "Invalid Date" }

An empty date parameter should return the current time in a JSON object with a unix key

An empty date parameter should return the current time in a JSON object with a utc key */