import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getUser({ userID }) {
    return apiHelper.post(`/users/${userID}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
