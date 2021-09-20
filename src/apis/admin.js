import { apiHelper } from './../utils/helpers'
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMyMDQxNzk4fQ.raLEmliSef42KfCeJLvF02vucczxGEg8tva8W1HjNAQ'

export default {
  adminGetTweets() {
    return apiHelper.get('/admin/tweets', {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
  },
  adminGetUsers() {
    return apiHelper.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    })
  }
}