import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../services/categories.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { productDTO } from '../../../dtos/product.dto';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styles: [],
})
export class UpdateProductComponent {
    categories: any;
    productId: number = 1;

    nameProduct: string = '';
    price: number = 0;
    category: number = 0;
    description: string = '';

    constructor(
        private router: Router,
        private categoriesService: CategoriesService,
        private productService: ProductService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.getAllCategories();
        this.route.paramMap.subscribe((params) => {
            this.productId = Number(params.get('id'));
            this.productService.getProduct(this.productId).subscribe({
                next: (response: any) => {
                    console.log(response);
                    this.nameProduct = response.name;
                    this.price = response.price;
                    this.category = response.category_id;
                    this.description = response.description;
                },
                complete: () => {},
                error: (error: any) => {
                    console.log('loi');
                },
            });
        });
    }

    getAllCategories() {
        this.categoriesService.getCategories().subscribe({
            next: (response: any) => {
                this.categories = response;
                console.log(this.categories);
            },
            complete: () => {},
            error: (error: any) => {
                console.log('llll');
            },
        });
    }

    onSelectChange(event: any) {}

    handleUpdateProduct() {
        const productDTO: productDTO = {
            name: this.nameProduct,
            price: this.price,
            thumbnail: '',
            description: this.description,
            category_id: this.category,
        };
        this.productService
            .updateProduct(this.productId, productDTO)
            .subscribe({
                next: (response: any) => {
                    const isConfirmed = window.confirm(
                        `Cập nhật thành công. Trở về trang sản phẩm.`
                    );
                    if (isConfirmed) {
                        this.router.navigate(['dashboard/products']);
                    }
                },
                complete: () => {},
                error: (error: any) => {
                    alert(`Cập nhật thất bại!!!`);
                },
            });
    }
}
