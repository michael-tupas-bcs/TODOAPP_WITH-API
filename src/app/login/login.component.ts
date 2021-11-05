import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup:any = FormGroup;
  constructor(private authService:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]),
    });
  }

  loginProcess(){
    if(this.formGroup.valid){
      this.authService.login(this.formGroup.value).subscribe(result =>{
        if(result.success){
          localStorage.setItem("token",result.token);
          localStorage.setItem("userid",result.userData.id);
          localStorage.setItem("username",result.userData.username);
          this.router.navigate(['home']);
          
        }else{
          alert("Invalid username or password!");
        }
      });
    }
  }

}
