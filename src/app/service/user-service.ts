import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../../interface/user-interfce';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiurl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // get Mapping...
  getUser(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiurl);
  }

  // post mapping...
  postUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiurl, user);
  }

  // put mapping...
  putUser(id: number, user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiurl}/${id}`, user);
  }

  //patch mapping...
  patchUser(id: number, status: boolean): Observable<Users> {
    return this.http.patch<Users>(`${this.apiurl}/${id}`, { status });
  }

  //delete mapping...
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiurl}/${id}`);
  }
}
