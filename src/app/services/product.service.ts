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
    keyword: string = '';
    constructor(private http: HttpClient) {}

    getProducts(page: number, limit: number, keyword: string): Observable<any> {
        const params = {
            page: page.toString(),
            limit: limit.toString(),
            keyword,
        };

        return this.http.get<any[]>(`${this.apiBaseUrl}/products`, { params });
    }

    addProduct(productDTO: productDTO): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post(`${this.apiBaseUrl}/products`, productDTO, {
            headers,
        });
    }
    getProduct(id: number): Observable<any> {
        return this.http.get(`${this.apiBaseUrl}/products/${id}`);
    }

    updateProduct(id: number, productDTO: productDTO): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.put(`${this.apiBaseUrl}/products/${id}`, productDTO, {
            headers,
        });
    }

    deleteProduct(id: number): Observable<string> {
        return this.http.delete<string>(`${this.apiBaseUrl}/products/${id}`);
    }
}
