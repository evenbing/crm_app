/**
 * 小程序配置文件
 */
/* eslint-disable */
import { NativeModules } from 'react-native';

let config ={};

let getCondition= async()=>{
  var result = NativeModules.system ? await NativeModules.system.getMode() : null;
  console.log(result);
  // return result || "xntalk";
  return result || "xntalkdev";
};

let getConfig = async ()=> {

    if(config && config.apiUrl){
        return config;
    }
    var object={};
    var result=await getCondition();
    switch (result.toLowerCase()){
        case "xntalkdev":
            // 开发环境
            object.apiUrl='https://api-dev.xiniunet.com/router?';
            object.app_key = 'FEDA506D38D8E930626E850139E74E0C';
            object.secret = '9019951CC31D86A31D2E911D4BE51142';
            object.uploadUrl = 'https://my-dev.xiniunet.com/api/attachmentUpload.do';
            break;
        case "xntalktest":
            //  测试环境
            object.apiUrl='https://api-test.xiniunet.com/router?';
            object.app_key = 'FEDA506D38D8E930626E850139E74E0C';
            object.secret = '9019951CC31D86A31D2E911D4BE51142';
            object.uploadUrl = 'https://my-test.xiniunet.com/api/attachmentUpload.do';
            break;
        default:
            object.apiUrl='https://api.xiniunet.com/router?';
            object.app_key='48C6AEB8E12E2D3D249B4D7771594AD6';
            object.secret='684CE9EF4B118766F3746997C9A256D2';
            object.uploadUrl='https://my.xiniunet.com/api/attachmentUpload.do';
    }
    config=object;
    return object;
};
export default getConfig;
