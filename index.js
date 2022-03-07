const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require('./config/key');

//application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

//application/json 
app.use(bodyParser.json());

// mongoDB 로그인 정보를 github에 그대로 올릴 수 없으므로,
// config에 따로 나누고, config를 불러옴
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req, res) => {
  // 회원가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어줌.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({ success: true })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})