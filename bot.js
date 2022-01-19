let Twit = require('twit')
let dotenv = require('dotenv')

dotenv.config()

let T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET 
})

let tweet = {
  status: "A test post from a Node app I'm building."
}

T.post('statuses/update', tweet, tweeted)

function tweeted(err, data, response) {
  if (err) {
    console.log("ERROR: ", err)
  } else {
    console.log("SUCCESS: ", response)
  }
}

// let params = {
//   q: 'banana since:2011-11-11',
//   count: 5
// }

// T.get('search/tweets', params, gotData)

// function gotData(err, data, response) {
//   let tweets = data.statuses
//   for (let i = 0; i < tweets.length; i++) {
//     console.log("----------------------------")
//     console.log(tweets[i].text)
//   }
// }

