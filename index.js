require('dotenv').load()
const express = require('express')
const NodeMailer = require('nodemailer')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()

// const config = {
//   email_info: {
//     host: process.env.HOST,
//     port: 465,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.PASSWORD
//     }
//   }
// }

// const transporter = NodeMailer.createTransport({
//   host: config.email_info.host,
//   port: config.email_info.port,
//   secure: true,
//   auth: {
//     user: config.email_info.auth.user,
//     pass: config.email_info.auth.pass
//   }
// })

var headers =  {
  "Content-Type": "application/json",
  "X-PW-AccessToken" : process.env.PROSPERWORKS_API_KEY,
  "X-PW-Application" : "developer_api",
  "X-PW-UserEmail" : "lindsey.lam@glaizalpartners.co"
};

app.set('port', process.env.PORT || 3001)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.get('/', (req, res) => {
  axios.get('https://api.prosperworks.com/developer_api/v1/account', {
    headers: headers
  })
    .then((result) => {
      console.log(result)
      return result
    }).catch((err) => {
      console.log(err)
      return err
    })
    return result
})

app.post('/send-mail', (req, res) => {
  // const data = req.body
  // const email_info = {
  //   from: `${data.name}, ${data.email_address}`,
  //   to: 'sabrina@theresaonthetown.com',
  //   subject: 'New Message from your Website ✔',
  //   text: data.message,
  //   html: `<b>${data.message}</b>`
  // }
  // let res_status
  // transporter.sendMail(email_info, (error, info) => {
  //   if (error) {
  //     res_status = false
  //     return res_status
  //   } else {
  //     res_status = true
  //   }
  // })
  // res.json({ success: res_status })
})

app.post('/subscribe', (req, res) => {
  // const data = req.body
  // let name = data.name || data.name !== null ? data.name : 'No Name'

  // const email_info = {
  //   from: `${data.email_address}`,
  //   to: 'sabrina@theresaonthetown.com',
  //   subject: 'New Subscription to your Newsletter ✔',
  //   text: `New Subscription from ${name}: ${data.email_address}`,
  //   html: `New Subscription from ${name}: <b>${data.email_address}</b>`
  // }
  // let res_status
  // transporter.sendMail(email_info, (error, info) => {
  //   if (error) {
  //     res_status = false
  //     console.log(error)
  //     return res_status
  //   } else {
  //     res_status = true
  //   }
  // })
  // res.json({ success: res_status })
})
app.listen(app.get('port'), function() {})


