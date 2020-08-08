import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { selectors } from '../auth'
import { API_HOST } from '../constants';
import history from './routing/app-history';
import logOutAction from '../auth';

let ngAuthToken;
let logout;
const IS_URL_RE = /^https?:\/\//;

const NGFetchProvider = ({ authToken, children, actions }) => {
  ngAuthToken = authToken;
  logout = actions.logout;
  return (<React.Fragment>{children}</React.Fragment>);
};

const mapStateToProps = (state) => ({
  authToken: selectors.selectAuthToken(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ logout: logOutAction }, dispatch)  
});

export default connect(mapStateToProps, mapDispatchToProps)(NGFetchProvider)

function createOptions(inputOptions = {}) {
  const options = { ...inputOptions };

  // ==== HEADER ====
  if (!options.headers) {
    options.headers = new Headers();
  }


  if (!options.headers.get('Authorization') && ngAuthToken) {
    options.headers.set('Authorization', `Bearer ${ngAuthToken}`);
  }

  if (!options.headers.get('Accept')) {
    options.headers.set('Accept', 'application/json');
  }

  if (options['Content-Type']) {
    options.headers.set('Content-Type', options['Content-Type']);
  }

  if (!options.headers.get('Content-Type')) {
    options.headers.set('Content-Type', 'application/json');
  }

  // ==== BODY ====
  if (options.body === null) {
    delete options.body;
  }

  const bodyType = typeof options.body;
  if (bodyType !== 'string' && bodyType !== 'number') {
    options.body = JSON.stringify(options.body);
  }

  return options;
}

function makeUrl(path, query) {
  const queryStr = query ? `?${queryString.stringify(query)}` : '';

  if (IS_URL_RE.test(path)) {
    return `${path}${queryStr}`;
  }

  return `${API_HOST}${path}${queryStr}`;
}

const JSON_TYPES = [
  'application/json',
  'application/vnd',
];
const isResponseJson = responseType => {
  let isJson = false;
  JSON_TYPES.forEach(type => {
    if (responseType.includes(type)) {
      isJson = true;
    }
  });
  return isJson;
};

export const ngFetch = async (path, options = {}) => {
  const response = await fetch(makeUrl(path, options.query), createOptions(options));
  const responseType = response.headers.get('Content-Type');

  if (responseType && isResponseJson(responseType)) {
    const body = await response.json();
    console.log("response", response);
    if (response.status === 401) {
      logout();
      history.push('/login');
    } else if (!response.ok) {
      throw Object.assign(new Error(), body);
    }
    return body;
  }

  if (!response.ok) {
    throw new Error('Problems found');
  }

  return null;
};
