import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from '../dtos/login.dto';
import { UserResponse } from '../responses/user.response';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private apiUrl: string = 'http://localhost:8088/api/v1/users';

    constructor(private http: HttpClient) {}

    login(loginData: LoginDTO): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${this.apiUrl}/login`, loginData, {
            headers: headers,
        });
    }

    getDetail(): Observable<any> {
        return this.http.post(`${this.apiUrl}/details`, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        });
    }

    getUserFromLocalStorage(): UserResponse | null {
        const userResponseJson = localStorage.getItem('user');
        if (userResponseJson == null || userResponseJson == undefined) {
            return null;
        }
        const userResponse = JSON.parse(userResponseJson);
        return userResponse;
    }

    saveUserToLocalStorage(userResponse?: UserResponse) {
        if (userResponse == null || !userResponse) {
            return;
        }

        const userResponseJson = JSON.stringify(userResponse);
        localStorage.setItem('user', userResponseJson);
    }

    removeUserFromLocalStorage(): void {
        localStorage.removeItem('user');
    }
}
