require('dotenv').load()

const express = require('express')
const NodeMailer = require('nodemailer')
const path = require('path')
const bodyParser = require('body-parser')
const axios = require('axios')
const { API_FUNCTIONS } = require('./prosperworks')
const User = require('./models/user')
const app = express()
const headers = {
  'Content-Type': 'application/json',
  'X-PW-AccessToken': process.env.PROSPERWORKS_API_KEY,
  'X-PW-Application': 'developer_api',
  'X-PW-UserEmail': 'lindsey.lam@glaizalpartners.co'
}

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

app.set('port', process.env.PORT || 3001)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.get('/glaizal', (req, res) => {
  axios
    .get('https://api.prosperworks.com/developer_api/v1/account', {
      headers: headers
    })
    .then(result => {
      const { id, name } = result.data
      console.log(result.data)
      res.send({
        ...result.data
      })
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
})

app.post('/glaizal/users/search', async (req, res) => {
  const { user } = req.body

  if (!user.prosperworksId) {
    const name = user.name ? user.name : false
    const linkedinId = user.sub ? user.sub : false
    const platforms = linkedinId ? ['LinkedIn'] : []
    const picture = user.picture ? user.picture : false
    const { email, email_verified, venues, id } = user
    const newLead = new User(
      id,
      email,
      name,
      picture,
      linkedinId,
      venues,
      platforms
    )

    const newProsperworksUser = await newLead.addToLeads()
    console.log(newProsperworksUser)
    const status = {
      existingLead: false,
      newUserLead: true,
      newLead: newProsperworksUser
    }
    res.send({ status: status })
  } else {
    res.send({
      status: {
        existingLead: true
      }
    })
  }
})

app.post('/glaizal/leads/new', (req, res) => {
  axios
    .get('https://api.prosperworks.com/developer_api/v1/leads/search', {
      headers: headers
    })
    .then(res => {
      console.log(res)
      const employees = result
      console.log(employees)
    })
    .catch(err => {
      console.log(err)
    })
})

/*
  Email Routes
*/

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
app.listen(app.get('port'), function() {
  console.log('running')
})
