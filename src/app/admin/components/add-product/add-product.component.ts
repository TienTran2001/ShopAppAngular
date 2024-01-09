import { Component } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { productDTO } from '../../../dtos/product.dto';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styles: [],
})
export class AddProductComponent {
    categories: any;

    nameProduct: string = '';
    price: number = 0;
    category: number = 0;
    descriptions: string = '';

    constructor(
        private router: Router,
        private categoriesService: CategoriesService,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.getAllCategories();
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

    onSelectChange(event: any) {
        this.category = event.target.value;
        console.log(this.category);
    }
    handleSubmitAddProduct() {
        const productDTO: productDTO = {
            name: this.nameProduct,
            price: this.price,
            thumbnail: '',
            description: this.descriptions,
            category_id: this.category,
        };
        console.log(productDTO);
        this.productService.addProduct(productDTO).subscribe({
            next: (response: any) => {
                if (response) {
                    alert('Thêm thành công');
                    this.router.navigate(['/dashboard/products']);
                }
            },
            complete: () => {},
            error: (error: any) => {
                alert('Thêm thất bại');
            },
        });
    }
}
