import { apiHelper } from './../utils/helpers'

export default {
  signIn({ account, password }) {
    return apiHelper.post('/users/signin', {
      account,
      password
    })
  },

  signUp({ account, name, email, password, passwordCheck }) {
    return apiHelper.post('/users/signup', {
      account,
      name,
      email,
      password,
      passwordCheck

    })
  }
}