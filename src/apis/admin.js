import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('admin-token')

export default {
  adminGetTweets() {
    return apiHelper.get('/admin/tweets', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  adminGetUsers() {
    return apiHelper.get('/admin/users', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  delete({ tweetId }) {
    return apiHelper.delete(`/admin/tweets/${tweetId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }
}