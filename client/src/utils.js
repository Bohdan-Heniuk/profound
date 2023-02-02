import jwt_decode from "jwt-decode";

export function getUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const parsedToken = jwt_decode(token);
  return parsedToken;
}

export function createFormDataFromObject(object) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(object)) {
    formData.append([key], value);
  }
  return formData;
}


export function uploadImages(file, onChange) {
  if (file) {
    onChange(file);
  } else {
    console.log("file error");
  }
}


