import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  public composeHeaders(token: string) {
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return headers;
    }
    return;
  }

  public getAllTasks(token: string) {
    return this.http.get(`${this.baseUrl}/v1/tasks`, { headers: this.composeHeaders(token) })
  }

  public createTask(data: Object, token: string) {
    return this.http.post(`${this.baseUrl}/v1/tasks/create`, data,
      { headers: this.composeHeaders(token) })
  }

  public updateTask(data: Object, token: string) {
    return this.http.put(`${this.baseUrl}/v1/tasks/update`, data,
      { headers: this.composeHeaders(token) })
  }

  public markAsDone(data: Object, token: string) {
    return this.http.put(`${this.baseUrl}/v1/tasks/update/mark-as-done`, data,
      { headers: this.composeHeaders(token) });
  }

  public markAsUndone(data: Object, token: string) {
    return this.http.put(`${this.baseUrl}/v1/tasks/update/mark-as-undone`, data,
      { headers: this.composeHeaders(token) });
  }
}
