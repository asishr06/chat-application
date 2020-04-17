import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url = 'https://chatapi.edwisor.com';

  constructor(public http:HttpClient) { }

  public signupFunction(data):Observable<any>{

    const params= new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('email',data.email)
    .set('mobileNumber',data.mobileNumber)
    .set('password',data.password)
    .set('apiKey',data.apiKey);


    return this.http.post(`${this.url}/api/v1/users/signup`,params);
  }//end of sign up function


public signinFunction(data):Observable<any>{

  const params = new HttpParams()
  .set('email',data.email)
  .set('password',data.password);


  return this.http.post(`${this.url}/api/v1/users/signin`,params);


}//end of signin function

//error handeling
private  handleError(err:HttpErrorResponse){

  let errorMessage ="";

  if(err.error instanceof Error)
  errorMessage =`An error occured :${err.error.message}`;
  console.log("handle error with http");
  console.log(err.message);
  return Observable.throw(err.message);
}




}
