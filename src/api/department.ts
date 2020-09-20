/** @format */

import { instance } from "../network/request";
import { Store } from "../views/Practice/Form/Form";

export function departmentAddApi(data: Store) {
  return instance({
    url: "/department/add/",
    method: "post",
    data,
  });
}

export function GetList(data: Store) {
  return instance({
    url: "/department/list/",
    method: "post",
    data,
  });
}

export function Delete(data: Store) {
  console.log(data);
  return instance({
    url: "/department/delete/",
    method: "post",
    data,
  });
}
