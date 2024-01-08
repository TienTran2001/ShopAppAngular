import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginDTO } from '../dtos/login.dto';
import { UserResponse } from '../responses/user.response';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // private apiUrl: string = 'http://localhost:8088/api/v1/users';
    private apiLogin: string = `${environment.apiBaseUrl}/users/login`;
    private apiUserDetail: string = `${environment.apiBaseUrl}/users/details`;

    constructor(private http: HttpClient) {}

    login(loginData: LoginDTO): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(this.apiLogin, loginData, {
            headers: headers,
        });
    }

    getDetail(): Observable<any> {
        return this.http.post(this.apiUserDetail, {
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
