const express = require('express')

const app = express()

let numberOfRequestsForUser = {};
setInterval(() => {
    numberOfRequestsForUser = {};
}, 10000)

const rateLimit = (req, res, next)=>{
  const userId = req.header('user-id')
  if(numberOfRequestsForUser[userId]){
    numberOfRequestsForUser[userId]++
    if(numberOfRequestsForUser[userId] > 5){
      res.status(404).json({})
    }else{
      next()
    }
  }else{
    numberOfRequestsForUser[userId] = 1;
    next();
  }
}

app.use(rateLimit);

app.get('/user', function(req, res) {
  res.status(200).json({ name: 'john' });
});

app.post('/user', function(req, res) {
  res.status(200).json({ msg: 'created dummy user' });
});

app.listen(3000)