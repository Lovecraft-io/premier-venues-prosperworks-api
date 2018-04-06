// const axios = require('axios')
// const headers = {
//   'Content-Type': 'application/json',
//   'X-PW-AccessToken': process.env.PROSPERWORKS_API_KEY,
//   'X-PW-Application': 'developer_api',
//   'X-PW-UserEmail': 'lindsey.lam@glaizalpartners.co'
// }

// export default class Lead {

//   constructor(
//     id,
//     name,
//     address,
//     assignee_id,
//     company_name,
//     customer_source_id,
//     details,
//     email,
//     monetary_value,
//     phone_numbers
//   ) {
//     this.id = id // number	Unique identifier for the Lead.
//     this.name = name // string	The first and last name of the Lead.
//     this.address = address // address	An encapsulation of the Lead's street, city, state, postal code, and country.
//     this.assignee_id = assignee_id // number	Unique identifier of the User that will be the owner of the Lead.
//     this.company_name = company_name // string	The name of the company to which the Lead belongs.
//     this.customer_source_id = customer_source_id // number	Unique identifier of the Customer Source that generated this Lead.
//     this.details = details // string	Description of the Lead.
//     this.email = email // email_address	An encapsulation of the Lead's email address and category.
//     this.monetary_value = monetary_value // number	The expected monetary value of business with the Lead
//     this.phone_numbers = phone_numbers // ]	list	An array of phone numbers belonging to the Lead.
//   }

//   // This will save to prosperworks API backend not Firebase
//   save = () => {

//   }

//   // This will query the prosperwork backend API
//   static find(user) {
//     let lead = await axios({
//       method: 'post',
//       url: 'https://api.prosperworks.com/developer_api/v1/people/fetch_by_email',
//       headers: headers,
//       data: {
//         email: email
//       }
//     })
//       .then(response => {
//         let { data } = response
//         console.log(data)

//         return data
//       })
//       .catch(error => {
//         const {data} = error.response
//         const {success} = data 

//         console.log(data)
//         console.log(success)
        
//         return success
//       })
//       return lead
//   }
  
  
// }
