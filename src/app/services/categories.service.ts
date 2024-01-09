import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    private apiBaseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) {}

    getCategories(): Observable<any> {
        return this.http.get<any[]>(`${this.apiBaseUrl}/categories`);
    }
}
