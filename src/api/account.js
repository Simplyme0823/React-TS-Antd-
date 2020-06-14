import { instance } from "../network/request";

export function loginSys(data) {
  return instance.request({
    url: "/login/",
    method: "post",
    data,
    //params: data//get
  });
}

export function GetCode(data) {
  return instance.request({
    url: "/getSms/",
    method: "post",
    data,
    //params: data//get
  });
}
