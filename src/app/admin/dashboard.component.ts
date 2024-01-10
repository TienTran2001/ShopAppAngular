import { Component } from '@angular/core';
import { UserResponse } from '../responses/user.response';
import { UserService } from '../services/user.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: [],
})
export class DashboardComponent {
    userResponse?: UserResponse | null;
    page = 'Trang chủ';

    menuBar = [
        { name: 'Trang chủ', link: '/dashboard/', icon: '' },
        { name: 'Sản phẩm', link: '/dashboard/products', icon: '' },
    ];

    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService
    ) {}

    ngOnInit() {
        this.userResponse = this.userService.getUserFromLocalStorage();
    }

    handleLogout() {
        this.tokenService.removeToken();
        this.userService.removeUserFromLocalStorage();
        this.router.navigate(['/home']);
    }

    handleLoginButton() {
        this.router.navigate(['/login']);
    }

    routerNavigate(item: any) {
        this.router.navigate([item.link]);
        this.page = item.name;
    }
}
