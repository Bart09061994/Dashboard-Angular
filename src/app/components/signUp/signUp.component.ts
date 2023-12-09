import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from 'src/app/app.component';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    AppComponent,
    NgIf,
  ],
  selector: 'app-signUp',
  templateUrl: './signUp.component.html',
  styleUrls: ['./signUp.component.css'],
})
export class SignUpComponent implements OnInit {
  hide = true;
  showMessage: boolean | undefined;
  responseFromApi: any;

  constructor(private AuthService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const mail = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    this.AuthService.signUp(mail, password, username).subscribe((data) => {
      console.log(data);
      this.showMessage = true;
      form.reset();
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 5000);
    });
  }

  getErrorMessage() {}
}
