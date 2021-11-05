import { Component, OnInit, Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { MatDialog } from "@angular/material/dialog"
import { AddTaskComponent } from '../add-task/add-task.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  helper = new JwtHelperService();
  userid: any;
  username: any;
  // todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // ongo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  // done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  todos = [
    { id: 0, taskTitle: '', taskDesc: '', sorting: 0, status: 0 },
  ];
  completed = [
    { id: 0, taskTitle: '', taskDesc: '', sorting: 0, status: 0 },
  ];


  constructor(private authService: AuthServiceService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.checkToken()) {
      alert("Token has been expired!");
      this.router.navigate(['login']);
    }
    this.userid = localStorage.getItem('userid');
    this.username = localStorage.getItem('username');

    this.getDataTodo();
    this.getDataDone();
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.updateRequestTodo();
      this.updateRequestDone();

    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.updateRequestTodo();
      this.updateRequestDone();
    }
  }

  getDataTodo() {
    this.authService.getDataTodo(this.userid).subscribe(result => {
      if (result.success) {
        let sorting = 0;
        this.todos = result.data.map((item: { id: any, taskTitle: any, taskDesc: any, sorting: any, status: any }) => {
          return {
            id: item.id,
            taskTitle: item.taskTitle,
            taskDesc: item.taskDesc,
            sorting: sorting++,
            status: item.status
          };
        });
      } else {
        if (result.message == "Record not found!") {
          this.todos = [];
        }
      }
    });
  }

  getDataDone() {
    this.authService.getDataDone(this.userid).subscribe(result => {
      if (result.success) {
        let sorting = 0;
        this.completed = result.data.map((item: { id: any, taskTitle: any, taskDesc: any, sorting: any, status: any }) => {
          return {
            id: item.id,
            taskTitle: item.taskTitle,
            taskDesc: item.taskDesc,
            sorting: sorting++,
            status: item.status
          };
        });
      } else {
        if (result.message == "Record not found!") {
          this.completed = [];
        }
      }
    });
  }
  updateRequestTodo() {
    let status = 0;
    let sorting = 0;
    for (var item of this.todos) {
      item.sorting = sorting++;
      item.status = status;
      this.updateTaskProcess(item.id, item);
    }
  }

  updateRequestDone() {
    let status = 1;
    let sorting = 0;
    for (var item of this.completed) {
      item.sorting = sorting++;
      item.status = status;
      this.updateTaskProcess(item.id, item);
    }
  }

  updateTaskProcess(id: any, data: any) {
    this.authService.updateTask(id, data).subscribe(result => { });
  }

  deleteTask(id: any) {
    this.authService.deleteTask(id).subscribe(result => {
      if (result.success) {
        alert(result.message);
        window.location.reload();
      } else {
        alert(result.message);
      }
    });
  }

  addTask() {
    this.dialog.open(AddTaskComponent);
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  checkToken() {
    var token = localStorage.getItem('token');
    return this.helper.isTokenExpired(token?.toString());
  }
}
