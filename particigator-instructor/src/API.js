import axios from "axios";

let api = 'http://localhost:3001'; 

export class API {
  static async getAllUsers() {
    const response = await axios.get(`${api}/users`);
    return response.data;
  }

  static async getAllQuestions() {
    const response = await axios.get(`${api}/questions`);
    return response.data;
  }

  static async postNewQuestion(data) {
    const response = await axios.post(`${api}/questions`, data)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
    return response.data;
  }

  static async getAllAdmin() {
    const response = await axios.get(`${api}/admin`);
    return response.data;
  }

}