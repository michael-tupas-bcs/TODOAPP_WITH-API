import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  task:any;
  data:any;
  formGroup:any = FormGroup;
  userid:any;
  id:any;
  constructor(private authService:AuthServiceService,private dialog:MatDialog, private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.task = sessionStorage.getItem('taskData');
    this.data = JSON.parse(this.task);
    this.userid = localStorage.getItem('userid');

    this.formGroup = new FormGroup({
      taskTitle: new FormControl(this.data.taskTitle,[Validators.required]),
      taskDesc: new FormControl(this.data.taskDesc),
      assignedTo: new FormControl(this.userid),
      id: new FormControl(this.data.id),
      sorting: new FormControl(this.data.sorting),
      status: new FormControl(this.data.status)
    });
  }
  closeThis(){
    this.dialog.closeAll();
  }
  updateTaskProcess() {
    this.authService.updateTask(this.data.id, this.formGroup.value).subscribe(result => { });
    window.location.reload();
  }

}
