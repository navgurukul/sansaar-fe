import { ngFetch } from '../providers/NGFetch';
import { authSuccess } from './index';

const googleAuthSuccess = (googleResponse) => async (dispatch) => {
  const body = { idToken: googleResponse.tokenObj.id_token };
  const json = await ngFetch('/users/auth/google', { method: 'POST', body });
  const { token, user } = json;
  dispatch(authSuccess({ token, user }));
};

module.exports = { googleAuthSuccess }
