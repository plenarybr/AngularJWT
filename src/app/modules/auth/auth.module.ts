import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpDevInterceptor } from '../interceptors/http.interceptor';

// Components
import { ToolbarComponent } from './toolbar/toolbar.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MaterialModule, HttpClientModule, ReactiveFormsModule],
  declarations: [LoginComponent, ToolbarComponent],
  exports: [RouterModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpDevInterceptor,
      multi: true,
    },
  ],

})

export class AuthModule {}
