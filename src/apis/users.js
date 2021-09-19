import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')


export default {
  getCurrentUser() {
    return apiHelper.get('/users/currentuser', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  getUser({ userID }) {
    return apiHelper.get(`/users/${userID}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserfollowings({ userID }) {
    return apiHelper.get(`/users/${userID}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserfollowers({ userID }) {
    return apiHelper.get(`/users/${userID}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTopUsers() {
    return apiHelper.get(`/users/topUsers`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })

  },
  postFollowships({ id }) {
    return apiHelper.post(`/followships`, { id }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

  getUserTweets({ userID }) {
    return apiHelper.get(`/users/${userID}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserReply({ userID }) {
    return apiHelper.get(`/users/${userID}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  editUserAccount({ userID, formData }) {
    return apiHelper.put(`users/${userID}/settings`,formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserLiked({ userID }) {
    return apiHelper.get(`/users/${userID}/liked`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteFollowships({ followingId }) {
    return apiHelper.delete(`/followships/${followingId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

}