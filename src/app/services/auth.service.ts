// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { User } from '../components/model/user.model';
// import { Observable, catchError, tap, throwError } from 'rxjs';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:8089/';
//   user: User | any;
//   isLoggedIn = false;
//   isAdminUser: boolean = false;
//   // isAdmin = false;
//   private jwtToken: string | null = null;

//   constructor(private http: HttpClient, private router: Router) {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       this.user = JSON.parse(storedUser);
//       this.isLoggedIn = true;
//       this.isAdminUser = this.user.email === 'bart@bart.com';
//     }
//     const storedJwtToken = localStorage.getItem('jwtToken');
//     if (storedJwtToken) {
//       this.jwtToken = storedJwtToken;
//     }
//   }

//   makeAuthenticatedRequest(
//     apiPath: string,
//     method: string,
//     data?: any
//   ): Observable<any> {
//     // Verifica se il token JWT è disponibile
//     if (!this.jwtToken) {
//       return throwError('Token JWT non disponibile');
//     }

//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${this.jwtToken}`,
//     });

//     const apiUrl = `${this.apiUrl}/${apiPath}`;

//     if (method === 'GET') {
//       return this.http.get(apiUrl, { headers });
//     } else if (method === 'POST') {
//       return this.http.post(apiUrl, data, { headers });
//     } else {
//       return throwError('Metodo HTTP non valido');
//     }
//   }

//   saveJwtToken(token: string) {
//     this.jwtToken = token;
//     localStorage.setItem('jwtToken', token);
//   }

//   getJwtToken(): string | null {
//     return this.jwtToken;
//   }

//   getSwaggerToken(): Observable<string | null> {
//     return this.http.get<string>(`${this.apiUrl}`).pipe(
//       catchError((error) => {
//         console.error('An error occurred:', error);
//         return throwError('Unable to fetch Swagger token.');
//       })
//     );
//   }

//   createUser(mail: string, password: string, username: string) {
//     const isAdminUser = mail === 'bart@bart.com';
//     this.router.navigate(['']);
//     if (isAdminUser) {
//       localStorage.setItem('isAdmin', 'true');
//     }
//     this.user = new User(mail, password, username);
//     this.isLoggedIn = true;
//     this.isAdminUser = mail === 'bart@bart.com';
//   }
//   isLoggedAsAdmin(): boolean {
//     return this.isAdminUser || localStorage.getItem('isAdmin') === 'true';
//   }

//   signUp(mail: string, password: string, username: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}register`, {
//       mail,
//       password,
//       username,
//       returnSecureToken: true,
//     });
//   }

//   signIn(mail: string, password: string, username: string): Observable<any> {
//     return this.http
//       .post(`${this.apiUrl}authenticate`, {
//         mail,
//         password,
//         username,
//         returnSecureToken: true,
//       })
//       .pipe(
//         tap((response: any) => {
//           if (response && response.jwtToken) {
//             this.isLoggedIn = true;
//             this.saveJwtToken(response.jwtToken);
//           }
//         }),
//         catchError((error) => {
//           console.error("Errore durante l'accesso:", error);
//           return throwError(error);
//         })
//       );
//   }

//   logOut() {
//     this.isLoggedIn = false;
//     this.user = null;
//     localStorage.removeItem(`user`);
//   }
//   updateUserData(loginData: any) {
//     // Aggiorna lo stato dell'utente o esegui altre azioni necessarie
//     this.isLoggedIn = true; // Imposta l'utente come autenticato
//     this.isAdminUser = loginData.isAdmin; // Aggiorna lo stato admin se necessario
//     // Puoi anche aggiornare altri dati utente se necessario
//   }

//   isAuthenticated() {
//     return this.isLoggedIn;
//   }

//   isRoleAdmin() {
//     return this['isAdminUser'];
//   }
//   getAllShops(): Observable<any> {
//     return this.http.get(`${this.apiUrl}shops`);
//   }
// }
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../components/model/user.model';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;
  APIkey = 'AIzaSyBEgN4ilkqXqcOghjV6iG95H-ofsPjqjmQ';
  signUpUrl = ` https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.APIkey}`;
  signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.APIkey}`;
  user: User | any;
  isLoggedIn = false;
  isAdminUser: boolean = false;
  // isAdmin = false;

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.isLoggedIn = true;
      this.isAdminUser = this.user.email === 'bart@bart.com';
    }
  }

  isAuthenticated() {
    return this.isLoggedIn;
  }

  isRoleAdmin() {
    return this['isAdminUser'];
  }

  createUser(
    email: string,
    id: string,
    username: string,
    token: string,
    expirationDate: Date
  ) {
    const isAdminUser = email === 'bart@bart.com';
    this.router.navigate(['']);
    if (isAdminUser) {
      localStorage.setItem('isAdmin', 'true');
    }
    this.user = new User(email, id, token, username, expirationDate);
    this.isLoggedIn = true;
    this.isAdminUser = email === 'bart@bart.com';
  }
  isLoggedAsAdmin(): boolean {
    return this.isAdminUser || localStorage.getItem('isAdmin') === 'true';
  }

  signUp(email: string, password: string, username: string) {
    return this.http
      .post(this.signUpUrl, {
        email: email,
        password: password,
        username: username,
        returnSecureToken: true,
      })
      .pipe(
        catchError((error) => {
          let errorMessage = 'Credenziali non valide';
          if (error.error && error.error.error && error.error.error.message) {
            errorMessage = error.error.error.message;
          }
          return throwError(errorMessage);
        })
      );
  }

  signIn(email: string, password: string, username: string) {
    return this.http
      .post(this.signInUrl, {
        email: email,
        password: password,
        username: username,
        returnSecureToken: true,
      })
      .pipe(
        catchError((error) => {
          let errorMessage = 'Campi non validi';
          if (error.error && error.error.error && error.error.error.message) {
            errorMessage = error.error.error.message;
          }
          return throwError(errorMessage);
        })
      );
  }

  logOut() {
    this.isLoggedIn = false;
    this.user = null;
    localStorage.removeItem(`user`);
  }
}
