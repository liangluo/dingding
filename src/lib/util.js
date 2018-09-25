/**
 * Created by xiangwenwen on 2017/2/9.
 */

// import metaHandler from './metaHandler';
import dingWISDK from './ding-web.js';
import { OPENAPIHOST } from './env.js';
// var isDingtalk = /DingTalk/.test(navigator.userAgent);

// export function parseCorpId(url, param) {
//     var searchIndex = url.indexOf('?');
//     var searchParams = url.slice(searchIndex + 1).split('&');
//     for (var i = 0; i < searchParams.length; i++) {
//         var items = searchParams[i].split('=');
//         if (items[0].trim() == param) {
//             return items[1].trim();
//         }
//     }
// }

// export function parseMicroApps(microApps, corpId){
//     return metaHandler.microAppsHandler(microApps, corpId);
// }

export function openLink(url, corpId){
    if(corpId && typeof corpId === 'string'){
        if (url && url.indexOf('$CORPID$') !== -1) {
            url = url.replace(/\$CORPID\$/, corpId);
        }
    }
    if (isDingtalk) {
        dd.biz.util.openLink({
            url: url,
            onSuccess: function(){
                if(typeof corpId === 'function'){
                    corpId();
                }
            },
            onFail: function(){
                if(typeof corpId === 'function'){
                    corpId();
                }
            }
        });
    } else {
        window.open(url);
    }
}

export function injsApiOAuth(){
    const agentid = sessionStorage.getItem("agentid")
    const envType = sessionStorage.getItem("envType")
    const signRequest = {
        url: OPENAPIHOST + '/httpH5/15102',
        params: {
            url: location.href.split('#')[0],
            agentid:agentid,  //184767536 192508449
            envType:envType
        }
    };
    // js-api 权限校验
    dingWISDK.jsApiOAuth(signRequest).then(function(response){
        // 获取开放的全部应用
    
     return  response.data.corpId
        // 走免登的流程 
       // self.getUserId();
    }).catch(function(error){
        alert('JS API 权限校验失败 error : ' + JSON.stringify(error));
    });
}

export default {
    injsApiOAuth
}
