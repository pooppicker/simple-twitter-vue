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

  PostTweet({ desciption}) {
    return apiHelper.post('/tweets', {
      desciption
    }, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })

  }
}
