import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getMessage({ roomId }) {
    return apiHelper.get(`/messages/${roomId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },

}