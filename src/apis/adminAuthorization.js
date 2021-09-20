import { apiHelper } from "./../utils/helpers";

export default {
  SignIn({ account, password }) {
    return apiHelper.post('/admin/signin', {
      account,
      password,
    });
  },
};
