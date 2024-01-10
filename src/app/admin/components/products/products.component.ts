import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

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

    keyword: string = '';
    showKeyword: string = '';
    loading: boolean = true;

    constructor(
        private productService: ProductService,
        private router: Router
    ) {
        console.log('vào contructowr');
    }

    ngOnInit() {
        this.getAllProducts();
    }

    getAllProducts() {
        this.productService
            .getProducts(this.page - 1, this.limit, this.keyword)
            .subscribe({
                next: (response: any) => {
                    this.products = response.products;
                    this.totalPage = response.totalPage;
                },
                complete: () => {
                    this.loading = false;
                },
                error: (error: any) => {
                    console.log('llll');
                },
            });
    }

    onEnterKeyPress(event: any) {
        this.showKeyword = this.keyword;
        this.getAllProducts();
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
        if (this.page != this.inputPage) {
            this.loading = true;
            this.productService
                .getProducts(this.inputPage, this.limit, this.keyword)
                .subscribe({
                    next: (response: any) => {
                        this.products = response.products;
                        this.page = this.inputPage;
                        this.loading = false;
                    },
                    complete: () => {},
                    error: (error: any) => {
                        console.log('llll');
                    },
                });
        }
    }

    onPreviousPage() {
        if (this.page > 1) {
            this.page = this.page - 1;

            this.productService
                .getProducts(this.page - 1, this.limit, this.keyword)
                .subscribe({
                    next: (response: any) => {
                        this.products = response.products;
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
                .getProducts(this.page - 1, this.limit, this.keyword)
                .subscribe({
                    next: (response: any) => {
                        this.products = response.products;
                    },
                    complete: () => {},
                    error: (error: any) => {
                        console.log('llll');
                    },
                });
        }
    }
}
