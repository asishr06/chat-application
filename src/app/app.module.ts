import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppService } from './app.service';
import { SignupComponent } from './user/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ChatModule,
    UserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    RouterModule .forRoot([
      {path:'login',component: LoginComponent,pathMatch:'full'},
      {path:'signup',component:SignupComponent,pathMatch:'full'},
      {path :'',redirectTo:'login',pathMatch:'full'},
      {path:'*',component:LoginComponent},
      {path:'**',component:LoginComponent}

    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
