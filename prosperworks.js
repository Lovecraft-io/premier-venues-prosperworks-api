const axios = require('axios')
const headers = {
  'Content-Type': 'application/json',
  'X-PW-AccessToken': process.env.PROSPERWORKS_API_KEY,
  'X-PW-Application': 'developer_api',
  'X-PW-UserEmail': 'lindsey.lam@glaizalpartners.co'
}

module.exports = {
  API_FUNCTIONS: {
    
    searchUsers: async user => {
      let potentialUser = await axios({
        method: 'post',
        url: 'https://api.prosperworks.com/developer_api/v1/people/fetch_by_email',
        headers: headers,
        data: {
          email: user.email
        }
      })
        .then(result => {
          console.log(result.data)
          let { data } = result
          return data
        })
        .catch(error => {
          console.log(error)
          return error
        })

      return potentialUser
    }
  }
}
