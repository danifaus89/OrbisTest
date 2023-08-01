import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly usersUrl = 'assets/users.json';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  authenticate(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        map((users: any[]) => users.filter((user: { username: string; password: string; }) => user.username === username && user.password === password))
      );
  }
}
