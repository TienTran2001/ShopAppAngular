import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { LoginDTO } from '../../dtos/login.dto';
import { LoginResponse } from '../../responses/login.response';
import { TokenService } from '../../services/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    phone: string;
    password: string;

    constructor(
        private router: Router,
        private userService: UserService,
        private tokenService: TokenService
    ) {
        this.phone = '';
        this.password = '';
    }

    onPhoneChange() {
        // console.log(`Phone: ${this.phone}`);
    }

    handleLogin() {
        const loginData: LoginDTO = {
            phone_number: this.phone,
            password: this.password,
        };

        this.userService.login(loginData).subscribe({
            next: (response: LoginResponse) => {
                const { token, message } = response;
                // luu token vao local storage
                this.tokenService.setToken(token);
                this.userService.getDetail().subscribe({
                    next: (response: any) => {
                        this.userService.saveUserToLocalStorage(response);

                        const user = this.userService.getUserFromLocalStorage();
                        debugger;

                        if (response.role.name === 'admin') {
                            this.router.navigate(['/dashboard']);
                        }
                        if (response.role.name === 'user') {
                            this.router.navigate(['/home']);
                        }
                    },
                    complete: () => {
                        debugger;
                    },
                    error: (error: any) => {
                        console.log('llll');
                    },
                });
                // this.router.navigate(['/dashboard']);
            },
            complete: () => {},
            error: (error: any) => {
                console.log('loi nè');
                alert(error.error.message);
            },
        });
    }
}
