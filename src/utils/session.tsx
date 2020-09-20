/** @format */

import cookies from "react-cookies";

// export function setToken(value: string) {
//   sessionStorage.setItem("adminToken", value);
// }

export function getToken(): string {
  return cookies.load("adminToken");
}
export function getUserName(): string {
  return cookies.load("username");
}
export function setToken(value: string) {
  cookies.save("adminToken", value, {});
}

export function setUsername(value: string) {
  cookies.save("username", value, {});
}
