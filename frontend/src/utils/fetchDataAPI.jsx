import axios from "axios";

export async function getData(url, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "GET",
    headers: `Bearer ${token}`,
  });
  return response;
}
export async function postData(url, data, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "POST",
    headers: `Bearer ${token}`,
    data,
  });
  return response;
}
export async function putData(url, data, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "PUT",
    headers: `Bearer ${token}`,
    data,
  });
  return response;
}
export async function patchData(url, data, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "PATCH",
    headers: `Bearer ${token}`,
    data,
  });
  return response;
}
export async function deleteData(url, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "DELETE",
    headers: `Bearer ${token}`,
  });
  return response;
}
