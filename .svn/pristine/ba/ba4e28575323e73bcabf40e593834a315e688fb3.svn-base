/**
 * Created by xiangwenwen on 2017/2/28.
 */
import * as mutations from "../vuex/mutation-types";
import axios from 'axios';
import qs from 'qs';
import logger from './logger';
import {
    authCode,
    isObject,
    msgLog
} from './shared';

axios.interceptors.request.use(function(config){
    return config;
},function (error) {
    return Promise.reject(error);
});

function request(Config, msg) {
    if (process.env.NODE_ENV !== 'production') {
        if (!isObject(Config)) {
            logger.error('必须传入 axios 配置对象');
            return;
        }
    }
    return new Promise(function (resolve, reject) {
        axios(Config).then(function (response) {
            resolve(response);
        }).catch(function (error) {
            reject({
                errcode: 100,
                errmsg: msg,
                error: error
            });
        });
    });
}

/**
 * [jsApiOAuth js-api 权限校验]
 * @param  {[type]} Config    [axios 配置对象]
 * @param  {[type]} jsApiList [需要权限校验的api列表]
 * @return {[type]}           [Promise]
 */
export function jsApiOAuth(Config, jsApiList) {
    if (process.env.NODE_ENV !== 'production') {
        if (!isObject(Config)) {
            logger.error('必须传入 axios 配置对象');
            return;
        }
    }
    let params = Config.params || {};
    const href = params.url;
    dd.error(function (error) {
        logger.error('dd js api OAuth error' + JSON.stringify(error));
    });
    if (process.env.NODE_ENV !== 'production') {
        if (!href) {
            logger.warn('参数 href 不能为空格');
        }
    }
    params.href = encodeURIComponent(href);
    Config.params = params;
    return new Promise(function (resolve, reject) {
        axios(Config).then(function (response) {
            const data = response.data;
            //    console.log('this',data)
            //不知道什么玩意
            // if (process.env.NODE_ENV !== 'production') {
            //     alert()
            //     const checks = ['timeStamp','agentId','jsticket','corpId','nonceStr','signature'];
            //     const responseKey = Object.keys(data);
            //     checks.map(function(v){
            //        const checkResult = responseKey.filter(function (k) { return v === k;});
            //        if (checkResult.length === 0){
            //            logger.warn('jsApiOAuth Response ' + v + ' 不能返回空');
            //        }
            //     });
            // }
            const config = {
                agentId: data.agentid || '',
                corpId: data.corpId || '',
                timeStamp: data.timeStamp || '',
                nonceStr: data.nonceStr || '',
                signature: data.signature || '',
                jsApiList: ['biz.user.get',
                    'device.base.getUUID',
                    'runtime.permission.requestAuthCode',
                    'runtime.info', 'biz.contact.choose',
                    'device.notification',
                    'biz.util.openLink',
                    'biz.contact.complexPicker',
                    'biz.contact.createGroup',
                    'biz.contact.departmentsPicker',
                    'biz.util.chosen',
                    'biz.util.uploadImage',
                    'biz.util.datepicker'
                ]
            };
            console.log('1', config)
            dd.config(config);
            resolve(response);
        }).catch(function (error) {
            reject({
                errcode: 100,
                errmsg: 'js api auth request bad',
                error: error
            });
            // console.log('sign request error' + JSON.stringify(error));
        });
    });

}

/**
 * [getUserId 根据 授权 获取corpId 获取用户id]
 * @param  {[type]} Config [axios 配置对象]
 * @param  {[type]} corpId [企业corpId]
 * @return {[type]}        [Promise]
 */
export function getUserId(Config, corpId) {
    if (process.env.NODE_ENV !== 'production') {
        if (!Config || typeof Config === 'string') {
            logger.error('必须传入 axios 配置对象');
            return;
        }
        if (!corpId) {
            logger.error('必须传入 corpId');
            return;
        }
    }
    return new Promise(function (resolve, reject) {
        authCode(corpId).then(function (result) {
            console.log('code', result)
            resolve(result);
            // request(Config, 'getUserId request bad').then(function (response) {
            //     console.log(response)
            //     resolve(response);
            // }).catch(function (error) {
            //     reject(error);
            // });
        }).catch(function (error) {
            reject(error);
        });
    });
}

/**
 * [getUserInfoRequest 获取用户详细信息]
 * @param  {[type]} Config [axios 配置对象]
 * @return {[type]}        [Promise]
 */
export function getUserInfo(Config) {
    return new Promise(function (resolve, reject) {
        console.log('Config', Config)
        axios(Config).then(function (result) {
        
            resolve(result);
        }).catch(function (error) {
            reject(error);
        });
    });
}

// export function getUserInfo(Config, corpId) {
//     return new Promise(function (resolve, reject) {
//         console.log('corpId', corpId)
//         authCode(corpId).then(function (result) {
//             resolve(result);
//         }).catch(function (error) {
//             reject(error);
//         });
//     });
// }

/**
 * [申请通用接口]
 */
export function publicSub(Config) {
    if((Config.data)&&(typeof(Config.data) == 'object')){
        Config.data = qs.stringify(Config.data)
    }
    return new Promise(function (resolve, reject) {
        axios(Config).then(function (result) {
            resolve(result);
        }).catch(function (error) {
            reject(error);
        });
    });
}

/**
 * [mis通用接口]
 */


export default {
    jsApiOAuth,
    getUserId,
    getUserInfo,
    publicSub
};