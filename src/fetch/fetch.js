import 'isomorphic-fetch';

import { API_ENDPOINT } from './constants';

export default ({ url }, reqOpts, action) =>
  fetch(API_ENDPOINT + url, reqOpts).then((res) =>
    res
      .json()
      .then((data) => ({
        headers: res.headers,
        status: res.status,
        statusText: res.statusText,
        url: res.url,
        reqOpts,
        action,
        data,
      }))
      .catch((error) => ({
        headers: res.headers,
        status: res.status,
        statusText: res.statusText,
        url: res.url,
        reqOpts,
        action,
        error,
      })),
  );
