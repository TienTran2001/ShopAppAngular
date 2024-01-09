import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { DashboardComponent } from './admin/dashboard.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ProductsComponent } from './admin/components/products/products.component';
import { ProductsComponent as ProductsDashboardComponent } from './admin/components/products/products.component';
import { AddProductComponent } from './admin/components/add-product/add-product.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            {
                path: 'products',
                component: ProductsDashboardComponent,
            },
            {
                path: 'add-product',
                component: AddProductComponent,
            },
        ],
    },
];
@NgModule({
    declarations: [
        HomeComponent,
        HeaderComponent,
        LoginComponent,
        AppComponent,
        DashboardComponent,
        ProductsComponent,
        ProductsDashboardComponent,
        AddProductComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
