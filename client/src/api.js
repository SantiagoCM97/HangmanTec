import axios from "axios";

export const signin = (payload) =>
  axios.post(`http://localhost:8080/user/signin`, payload);
