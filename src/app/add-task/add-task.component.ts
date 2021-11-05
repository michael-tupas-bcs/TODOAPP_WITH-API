import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})

export class AddTaskComponent implements OnInit {
  formGroup:any = FormGroup;
  userid:any;
  constructor(private authService:AuthServiceService,private dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.userid = localStorage.getItem('userid');
    this.formGroup = new FormGroup({
      taskTitle: new FormControl('',[Validators.required]),
      taskDesc: new FormControl(''),
      assignedTo: new FormControl(this.userid),
    });
  }

  closeThis(){
    this.dialog.closeAll();
  }

  addTaskProcess(){
    console.log(this.formGroup.value);
    if(this.formGroup.valid){
      this.authService.addTask(this.formGroup.value).subscribe(result =>{
        if(result.success){
          alert(result.message);
          window.location.reload();
        }else{
          alert(result.message);
        }
      });
    }
  }
  
}
