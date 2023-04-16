import axios from "axios";

let api = 'http://localhost:3001'; 

export class API {
  static async getAllUsers() {
    const response = await axios.get(`${api}/users`);
    return response.data;
  }

  static async getInstructorUsers(instructor) {
    const res= await axios.get(`${api}/users/${instructor}`, {instructor: instructor})
    .then(response => {
      if(response.status !== 404){
        //console.log('Working ' + response.data);
        return response.data;
      }
    })
    .catch(error => {
      console.error(error);
      return null;
    });
    //console.log(response.data);
    console.log('Working ' + res);
    return res;
  }

  static async getInstructorQuestions(instructor) {
    const res= await axios.get(`${api}/questions/${instructor}`, {instructor: instructor})
    .then(response => {
      if(response.status !== 404){
        //console.log('Working ' + response.data);
        return response.data;
      }
    })
    .catch(error => {
      console.error(error);
      return null;
    });
    //console.log(response.data);
    console.log('Working ' + res);
    return res;
  }

  static async getGrades(instructor) {
    const res= await axios.get(`${api}/submissions/${instructor}`, {instructor: instructor})
    .then(response => {
      if(response.status !== 404){
        //console.log('Working ' + response.data);
        return response.data;
      }
    })
    .catch(error => {
      console.error(error);
      return null;
    });
    //console.log(response.data);
    console.log('Working ' + res);
    return res;
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

  static async updateCurrAssignmentAdmin(instructor, currAss) {
    let params = {instructor: instructor, currAss: currAss};
    const response = await axios.put(`${api}/admin/${instructor}`, params);
    return response;
  }

  static async postNewAdmin(data) {
    console.log(data.email);
    const response = await axios.post(`${api}/admin`, data)
    .then(response => {
      if(response.status == 200){
        console.log('Working ' + response);
        return true;
      }
      
    })
    .catch(error => {
      console.error('Error ' + error);
      return false;
    });
  }

}