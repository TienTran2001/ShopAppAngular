import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styles: [],
})
export class ProductsComponent {
    products: [] | any;
    page: number = 1;
    inputPage: number = 1;
    limit: number = 8;
    totalPage: number = 0;

    constructor(
        private productService: ProductService,
        private router: Router
    ) {}

    ngOnInit() {
        this.getAllProducts();
    }

    getAllProducts() {
        console.log('vao ne');
        this.productService.getProducts(this.page - 1, this.limit).subscribe({
            next: (response: any) => {
                this.products = response.products;
                this.totalPage = response.totalPage;
                console.log(this.products);
            },
            complete: () => {},
            error: (error: any) => {
                console.log('llll');
            },
        });
    }

    handleInputPage() {
        console.log(this.inputPage);
    }
    goToEditProduct(id: string) {
        this.router.navigate(['/dashboard/edit-product', id]);
    }

    handleDelete(id: number, name: string) {
        const isConfirmed = window.confirm(`Bạn có chắc muốn xóa ${name} ?`);
        if (isConfirmed) {
            this.productService.deleteProduct(id).subscribe({
                next: (response: string) => {
                    alert(`Xóa thành công ${name}`);
                    this.getAllProducts();
                },
                complete: () => {},
                error: (error: any) => {
                    debugger;
                    alert(`Xóa không thành công ${error.error.message}`);
                },
            });
        }
    }

    onClickGoPage() {
        if (this.page != this.inputPage)
            this.productService
                .getProducts(this.inputPage, this.limit)
                .subscribe({
                    next: (response: any) => {
                        this.products = response.products;
                        this.page = this.inputPage;
                        console.log(this.page);
                    },
                    complete: () => {},
                    error: (error: any) => {
                        console.log('llll');
                    },
                });
    }

    onPreviousPage() {
        if (this.page > 1) {
            this.page = this.page - 1;
            this.productService
                .getProducts(this.page - 1, this.limit)
                .subscribe({
                    next: (response: any) => {
                        this.products = response.products;

                        console.log(this.page);
                    },
                    complete: () => {},
                    error: (error: any) => {
                        console.log('llll');
                    },
                });
        }
    }

    onNextPage() {
        if (this.page < this.totalPage) {
            this.page = this.page + 1;
            this.productService
                .getProducts(this.page - 1, this.limit)
                .subscribe({
                    next: (response: any) => {
                        this.products = response.products;

                        console.log(this.page);
                    },
                    complete: () => {},
                    error: (error: any) => {
                        console.log('llll');
                    },
                });
        }
    }
}
