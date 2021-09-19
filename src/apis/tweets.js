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

  getSpecificTweets({ tweetId }) {
    return apiHelper.get(`/tweets/ ${tweetId}`, {
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
  },

  postTweetLiked({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/like`,null , {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  postTweetUnliked({ tweetId }) {
    return apiHelper.post(`/tweets/${tweetId}/unlike`,null , {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },


}
