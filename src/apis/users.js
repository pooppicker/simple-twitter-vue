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
    return apiHelper.post(`/users/${userID}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
