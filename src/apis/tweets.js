import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getTweets() {
    return apiHelper.get('/tweets', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },

  PostTweet({ description}) {
    return apiHelper.post('/tweets', {
      description
    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

  }
}
