/* eslint-disable */
import { NativeModules } from 'react-native';
import MD5 from 'md5';

export let config = {
  apiUrl: null,
  app_key: null,
  secret: null,
  uploadUrl: null,
};

export const init=function (data) {
  config = data;
};


class ResponseError extends Error {
  constructor(message, code, origin) {
    super(message);
    this.code = code;
    this.origin = origin;
  }
}

export const isArray = (o) => {
  return Object.prototype.toString.call(o) === '[object Array]';
}

export function getPassportId(){
  return new Promise(function (resolve, reject) {
    // resolve('1034738035494883328');
    NativeModules.security.getPassportId().then((result) => {
        resolve(result);
      }
    ).catch((error) => {
      console.log(error)
    });
  })
}

function identityId(){
  return  new Promise(function (resolve, reject) {
    // resolve('801689539428098048');
    NativeModules.security.getIdentityId().then((result) => {
        resolve(result);
      }
    ).catch((error) => {
      console.log(error)
    });
  })
}
async function getPostParameter(request) {
  const param_array = new Object();
  this.passportId = await getPassportId();
  // this.passportId = '1015609398284128256';
  this.identityId = await identityId();


  if (this.passportId !== undefined && this.passportId != null && this.passportId > 0) {
    param_array.passportId = this.passportId;
  }
  if (this.identityId !== undefined && this.identityId != null && this.identityId > 0) {
    param_array.identityId = this.identityId;
  }
  param_array.format = 'json';
  param_array.sign_method = 'md5';
  param_array.timestamp = Date.parse(new Date());
  param_array.app_key = config.app_key;
  param_array.v = '1.0';
  for (const p in request) { // 方法
    if (request[p] != null && request[p] !== undefined && typeof (request[p]) !== 'function') {
      param_array[p] = request[p];
    }
  } {
    var param_sign;
    var arrayKey = [];
    var strTemp;
    var arrayKeyTemp = [];
    for (var p in param_array) { // 方法
      if (typeof (param_array[p]) !== "function") {
        arrayKeyTemp.push(p);
      }
    }
    // 最后显示所有的属性
    arrayKeyTemp.sort();
    var strTemp = config.secret;
    for (var i = 0; i < arrayKeyTemp.length; i++) {
      if (isArray(param_array[arrayKeyTemp[i]])) {
        strTemp = strTemp + arrayKeyTemp[i] + JSON.stringify(param_array[arrayKeyTemp[i]]);
      } else {
        strTemp = strTemp + arrayKeyTemp[i] + param_array[arrayKeyTemp[i]];
      }
    }
    strTemp = strTemp + config.secret;
    param_sign = MD5(strTemp).toString().toUpperCase();
    var post_data = 'sign=' + param_sign.toUpperCase();
    for (var i = 0; i < arrayKeyTemp.length; i++) {
      if (isArray(param_array[arrayKeyTemp[i]])) {
        post_data = post_data + '&' + arrayKeyTemp[i] + '=' + encodeURI(JSON.stringify(param_array[arrayKeyTemp[i]]));
      } else {
        post_data = post_data + '&' + arrayKeyTemp[i] + '=' + encodeURI(param_array[arrayKeyTemp[i]]);
      }
    }
  }

  return post_data;
}

async function request(data, _options) {
  const options = _options || {};

  // config.apiUrl

  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  options.body= await getPostParameter(data);

  console.log(JSON.stringify(options.body));
  const resp = await fetch(config.apiUrl.toString(), options);
  const json = await resp.json();
  console.log('RESP:', json);

  // 如果请求失败
  if (resp.status !== 200) {
    if (resp.status === 401) {
      console.log(resp.status);
    }
    throw new ResponseError(json.message, resp.status, json);
  }
  // 服务不可用
  if (json.message) {
    throw new ResponseError(json.message, resp.status, json);
  }
  return json;
}

// post
export function post(data, options) {
  return request(data, {
    method: 'POST',
    mode: "cors",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...options,
  });
}

// 上传
export async function upload(file) {
  // config.apiUrl
  const body = new FormData();
  body.append('File', file);
  body.append("Type", "PHOTO");
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body,
  };
  const passportId = await getPassportId();
  // console.log(body);
  const resp = await fetch(config.uploadUrl + "?passportId=" + passportId, options);
  const json = await resp.json();
  console.log('RESP:', json);
  // 如果请求失败
  if (resp.status !== 200) {
    throw new ResponseError(json.message, resp.status, json);
  }
  return json;
}
