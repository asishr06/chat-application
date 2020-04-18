import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrModule } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email :any;
  public password :any;

  constructor(
    public appService:AppService,
    public router:Router,
    public toastr:ToastrService,
    vcr:ViewContainerRef) { 
     // this.toastr.setRootViewContainerRef(vcr);
      }

  ngOnInit(): void {
  }

  public goToSignUp:any = () => {

    this.router.navigate(['/sign-up']);

  }

  public signinFunction :any = () => {

    if(!this.email){

      this.toastr.warning('Enter Email');
    }else if(!this.password){
      this.toastr.warning('Enter Password');
    }else
    {
      let data ={
        email : this.email,
        password:this.password
      }

    this.appService.signinFunction(data).subscribe((apiResponse) => {

        if(apiResponse.status === 200) {

          console.log(apiResponse);
          this.toastr.success('Signin successful');
            Cookie.set('authtoken',apiResponse.data.authToken);
            Cookie.set('receiverId',apiResponse.data.userDetails.userId);
            Cookie.set('receiverName',apiResponse.data.userDetails.firstName+' '+apiResponse.data.userDetails.lastName);
            this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
            this.router.navigate(['/chat']);
        }
        else {
          this.toastr.error(apiResponse.message);
        }

      },(err)=>{

        this.toastr.error('some error occured');
      });
      
    }

  }  
}
