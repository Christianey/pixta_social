import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "Access-Control-Allow-Origin": "http://localhost:5000/",
};

export async function getData(url, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });
  return response;
}
export async function postData(url, data, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    data,
  });
  return response;
}
export async function putData(url, data, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    data,
  });
  return response;
}
export async function patchData(url, data, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    data,
  });
  return response;
}
export async function deleteData(url, token) {
  const response = await axios({
    url: `/api/${url}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  });
  return response;
}