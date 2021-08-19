import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "https://pixta.herokuapp.com",
};

export async function getData(url, token) {
  const response = await axios({
    url: `https://pixta.herokuapp.com/api/${url}`,
    method: "GET",
    headers: { ...headers, Authorization: token },
  });
  return response;
}
export async function postData(url, data, token) {
  const response = await axios({
    url: `https://pixta.herokuapp.com/api/${url}`,
    method: "POST",
    headers: { ...headers, Authorization: token },
    data,
  });
  return response;
}
export async function putData(url, data, token) {
  const response = await axios({
    url: `https://pixta.herokuapp.com/api/${url}`,
    method: "PUT",
    headers: { ...headers, Authorization: token },
    data,
  });
  return response;
}
export async function patchData(url, data, token) {
  const response = await axios({
    url: `https://pixta.herokuapp.com/api/${url}`,
    method: "PATCH",
    headers: { ...headers, Authorization: token },
    data,
  });
  return response;
}
export async function deleteData(url, token) {
  const response = await axios({
    url: `https://pixta.herokuapp.com/api/${url}`,
    method: "DELETE",
    headers: { ...headers, Authorization: token },
  });
  return response;
}
