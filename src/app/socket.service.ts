import { Injectable } from '@angular/core';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Cookie } from 'ng2-cookies/ng2-cookies';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse,HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private url = 'https://chatapi.edwisor.com';
  private socket;
  
  constructor(public http:HttpClient ) {

    //connection is being created
    //handshake
    this.socket =io(this.url);
   }

//events to be listend
public verifyUser = () => {

  return Observable.create((observer) =>{

    this.socket.on('verifyUser',(data) =>{
      observer.next(data);

    } ); //end socket

  });//end observable
}//end verifyUser

public onlineUserList = () => {

  return Observable.create((observer) => {

    this.socket.on('online-usr-list',(userList) =>{

      observer.next(userList);
    });
  });
}

public disconnectedSocket = () => {

  return Observable.create((observer) =>{
    this.socket.on('disconnect',() =>{

      observer.next();
    });
  });
}

//events to be emitted
public setUser = (authToken) => {
  this.socket.emit('set-user',authToken);
}


private  handleError(err:HttpErrorResponse){

  let errorMessage ="";

  if(err.error instanceof Error)
  {
  errorMessage =`An error occured :${err.error.message}`;
  }else{
  errorMessage =`server returned code : ${err.status},error message is :${err.message}`;
  }
  console.log("handle error with http");
  console.log(err.message);
  return Observable.throw(err.message);
}


}
