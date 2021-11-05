import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }
  
  login(data: any):Observable<any>{
    return this.http.post(`${baseUrl}users/login`,data);
  }
  register(data: any):Observable<any>{
    return this.http.post(`${baseUrl}users`,data);
  }
  getDataTodo(id:any):Observable<any>{
    return this.http.get(`${baseUrl}task/todo/${id}`);
  }
  getDataDone(id:any):Observable<any>{
    return this.http.get(`${baseUrl}task/done/${id}`);
  }
  addTask(data: any):Observable<any>{
    return this.http.post(`${baseUrl}task`,data);
  }
  deleteTask(id:any):Observable<any>{
    return this.http.delete(`${baseUrl}task/${id}`);
  }
  updateTask(id:any, data:any):Observable<any>{
    return this.http.patch(`${baseUrl}task/${id}`,data);
  }
}

