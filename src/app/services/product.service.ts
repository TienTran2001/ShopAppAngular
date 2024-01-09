import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { productDTO } from '../dtos/product.dto';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private apiBaseUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) {}

    getProducts(page: number, limit: number): Observable<any> {
        const params = {
            page: page.toString(),
            limit: limit.toString(),
        };

        return this.http.get<any[]>(`${this.apiBaseUrl}/products`, { params });
    }

    addProduct(productDTO: productDTO): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${this.apiBaseUrl}/products`, productDTO, {
            headers,
        });
    }

    deleteProduct(id: number): Observable<string> {
        return this.http.delete<string>(`${this.apiBaseUrl}/products/${id}`);
    }
}
