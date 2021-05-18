import axios from 'axios';


export const instance = axios.create({
    baseURL: 'http://c76e55b028fc.ngrok.io/',
  //  timeout: 4000,  https://hubx2.herokuapp.com/
  //  method: 'POST',
//  headers: {'reqcomingfrom': 'web','Content-Type': 'application/json','lang':'en','accept':'json'}//,'apikey':'ABCD123'}  'Content-Type': 'application/json',  method: 'POST',
// //   
}
);


// instance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     console.log("Request Interceptor Call"+localStorage.tokenId );
//     config.headers['token']=localStorage.tokenId;
//     return config;
//   }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   });