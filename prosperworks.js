const axios = require('axios')
const headers = {
  'Content-Type': 'application/json',
  'X-PW-AccessToken': process.env.PROSPERWORKS_API_KEY,
  'X-PW-Application': 'developer_api',
  'X-PW-UserEmail': 'lindsey.lam@glaizalpartners.co'
}

class Lead {
  constructor(id, name, address, assignee_id, ) {

  }
}

module.exports = {
  API_FUNCTIONS: {
    
    searchUsers: async user => {
      console.log(user)
      const { email } = user
      let potentialUser = await axios({
        method: 'post',
        url: 'https://api.prosperworks.com/developer_api/v1/people/fetch_by_email',
        headers: headers,
        data: {
          email: email
        }
      })
        .then(response => {
          let { data } = response
          console.log(data)

          return data
        })
        .catch(error => {
          const {data} = error.response
          const {success} = data 

          console.log(data)
          console.log(success)
          
          return success
        })

      return potentialUser
    },

    createNewLead: async (user) => {
      let newLead = await axios({
        method: 'post',
        url: 'https://api.prosperworks.com/developer_api/v1/leads',
        headers: headers,
        data: {
          email: email
        }
      })
    }
  }
}
