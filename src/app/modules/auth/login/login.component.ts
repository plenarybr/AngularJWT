import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { AuthService } from '../../services/auth.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public matcher = new MyErrorStateMatcher();

  constructor(private authService: AuthService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
    });
  }

  ngOnInit(): void { }

  onLoginSubmit(): void {
    this.authService
      .login([this.loginForm.controls.email.value, this.loginForm.controls.password.value])
      .then((res) => {
        this.authService.setUser(res);
      })
      .catch((rej) => {
        console.log(rej);
      })
  }
}
