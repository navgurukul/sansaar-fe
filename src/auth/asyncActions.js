import { ngFetch } from '../providers/NGFetch';
import { authSuccess, fetchSuccess, fetchedDatafromSlice } from './index';

const googleAuthSuccess = (googleResponse) => async (dispatch) => {
  const body = { idToken: googleResponse.tokenObj.id_token };
  const json = await ngFetch('/users/login/google', { method: 'POST', body });
  console.log(json,'token');
  const { userToken, user } = json;
  dispatch(authSuccess({ userToken, user }));
};

// const fetchServerData = () => async(dispatch) => {
//   const data = await ngFetch('https://jsonplaceholder.typicode.com/posts', { method: 'GET' });
//   console.log(data, 'data');
//   dispatch(fetchedDatafromSlice(data));
// };

module.exports = { googleAuthSuccess }
