'use strict';

const axios = require('axios')
const headers = {
  'Content-Type': 'application/json',
  'X-PW-AccessToken': process.env.PROSPERWORKS_API_KEY,
  'X-PW-Application': 'developer_api',
  'X-PW-UserEmail': 'lindsey.lam@glaizalpartners.co'
}


module.exports = class User {

  constructor(id, email, name, picture, linkedinId, venues, platforms) {
    this.id = id 
    this.email = email
    this.name = name
    this.picture = picture
    this.platforms = platforms
    this.linkedinId = linkedinId 
    this.prosperworksId = false
    this.venues = []
    this.studios = []
    this.intercomVerified = false
    this.isLead = false
    this.isPremierMember = false
    this.prosperWorksMember = false
    this.address = false
    this.assignee_id = false
    this.company_name = false
    this.customer_source_id = false
    this.details = false
    this.monetary_value = false
    this.phone_numbers = false
  }
  
  async isProsperworksUser (user) {
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
  }

  async isProsperworksLead (user) {
    let newUserLead = await axios({
      method: 'post',
      url: 'https://api.prosperworks.com/developer_api/v1/leads/search',
      headers: headers,
      data: {
        email: email
      }
    })
  }

  async addToLeads () {
    const _this = this 

    let newUserLead = await axios({
      method: 'post',
      url: 'https://api.prosperworks.com/developer_api/v1/leads',
      headers: headers,
      data: {
        name: this.name,
        email: {
          email: this.email,
          category: 'work'
        },
        phone_numbers: []
      }
    }).then((res) => {
      console.log(res)
      const { id } = res.data 
      _this.prosperworksId = id 
      _this.isLead = true 
      // Need to add the rest of the prosperworks data but this is good for now
      return _this
    }).catch((err) => {
      console.log(err)
      return err.response.data
    })
    console.log(this)
    console.log(_this)
    return newUserLead
  }

}
