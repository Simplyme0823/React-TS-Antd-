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
  return instance({
    url: "/department/delete/",
    method: "post",
    data,
  });
}

export function SwitchStatus(data: Store) {
  return instance({
    url: "/department/status/",
    method: "post",
    data,
  });
}

export function Detailed(data: Store) {
  return instance({
    url: "/department/detailed/",
    method: "post",
    data,
  });
}

export function Edit(data: Store) {
  return instance({
    url: "/department/edit/",
    method: "post",
    data,
  });
}
