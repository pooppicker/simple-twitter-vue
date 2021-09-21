import { apiHelper } from "./../utils/helpers";

export default {
  SignIn({ email, password }) {
    return apiHelper.post('/admin/signin', {
      email,
      password,
    });
  },
};
