import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../model/user.model';
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
    RouterModule,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  errorMessage: string = '';

  isAdminUser: boolean = false;

  constructor(private AuthService: AuthService, private router: Router) {}
  ngOnInit() {
    this.isAdminUser = this.AuthService.isLoggedAsAdmin();
  }
  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    this.AuthService.signIn(email, password, username).subscribe(
      (data: any) => {
        console.log(data);
        const expirationDate = new Date(
          new Date().getTime() + data.expiresIn * 1000
        );
        this.AuthService.createUser(
          data.email,
          data.username,
          data.localId,
          data.IdToken,
          data.expiresIn
        );
        localStorage.setItem('user', JSON.stringify(this.AuthService.user));
        this.router.navigate(['']);
        form.reset();
      }
    );
  }
  // onSubmit(form: NgForm) {
  //   const mail = form.value.mail;
  //   const password = form.value.password;
  //   const username = form.value.username;

  //   this.AuthService.signIn(mail, password, username).subscribe(
  //     (loginData: any) => {
  //       console.log('Accesso effettuato con successo:', loginData);
  //       this.AuthService.updateUserData(loginData);

  //       this.router.navigate(['']);
  //     },
  //     (loginError) => {
  //       console.error("Errore durante l'accesso:", loginError);
  //     }
  //   );
  // }
}
