import * as mutations from "./mutation-types";
import env from "../../env";
import jsapi from "../lib/ddApiConfig";
import axios from "axios";

export function getRequestAuthCode({ dispatch, state }, corpId) {
  if (
    !window.ability ||
    window.ability < jsapi["runtime.permission.requestAuthCode"]
  ) {
    console.warn("容器版本过低，不支持 runtime.permission.requestAuthCode");
    return;
  }

  dd.runtime.permission.requestAuthCode({
    corpId: state.app.ddConfig.corpId || corpId,
    onSuccess: function(result) {
      dispatch(mutations.UPDATE_CODE, result.code);

      getUserInfo({ dispatch, state }, result.code);

      console.log("获取到了免登陆code=>" + result.code);
    },
    onFail: function(err) {
      dispatch(mutations.UPDATE_CODE, false);
      console.log("获取免登陆code失败");
    }
  });
}

export function getUserInfo({ dispatch, state }, code) {
  axios
    .get(env.API_HOST + "/user/getUserinfo", {
      params: {
        code: code,
        corpId: state.app.ddConfig.corpId,
        suiteKey: window.getParamByName("suiteKey")
      },
      timeout: 5000
    })
    .then(function(response) {
      if (response.status == 200 && response.data.code == 200) {
        let user = response.data.result;
        dispatch(mutations.LOGIN_SUCCESS, user);
        dispatch(mutations.UPDATE_SYS_LEVEL, user.sys_level);
      } else {
        dispatch(mutations.LOGIN_ERROR, false);
      }
    })
    .catch(function(err) {
      dispatch(mutations.LOGIN_ERROR, false);
    });
}
