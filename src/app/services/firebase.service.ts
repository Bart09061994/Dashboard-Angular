import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private http: HttpClient, private AuthService: AuthService) {}

  insertPersona(url: string, body: {}) {
    return this.http.post(url, body);
  }
  getPersona(url: string) {
    return this.http.get(`${url}?auth=${this.AuthService.user.token}`);
  }
  deletePersona(url: string, id: string) {
    return this.http.delete(`${url}/${id}.json`);
  }
  patchPersona(url: string, id: string, body: {}) {
    return this.http.patch(`${url}/${id}.json`, body);
  }
}
