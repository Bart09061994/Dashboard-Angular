import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  createComponent,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CreateCardService } from 'src/app/services/create-card.service';
import { CommonModule } from '@angular/common';
import { Card } from 'src/app/services/create-card.service';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css'],
})
export class CreateCardComponent implements OnInit {
  @Output() imageUploaded = new EventEmitter<string>();
  selectedFile: File | null = null;
  newCard: Card = {
    id: 0,
    name: '',
    detail: '',
    price: 0,
    imgSrc: '',
    store: '',
  };
  constructor(
    private router: Router,
    private CreateCardService: CreateCardService,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const storeIdStr = params.get('storeId');
      if (storeIdStr) {
        const storeId = parseInt(storeIdStr, 10);
        this.newCard.store = storeId.toString();
      }
    });
  }
  uploadImageAndGetUrl(file: File) {
    const fakeImageUrl = 'url_del_servizio_di_archiviazione/immagine.png';
    this.newCard.imgSrc = fakeImageUrl;
  }

  createNewCard() {
    if (this.newCard.name.trim() !== '') {
      this.CreateCardService.createCard(this.newCard);
    }
    this.router.navigate(['/store', this.newCard.store]);
  }
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFile = input.files[0];
    }
  }
  uploadImage() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.http
        .post<any>('URL_DEL_TUO_ENDPOINT_DI_CARICAMENTO', formData)
        .subscribe(
          (response) => {
            const imageUrl = response.imageUrl;
            this.imageUploaded.emit(imageUrl);
          },
          (error) => {
            console.error(
              "Errore durante il caricamento dell'immagine:",
              error
            );
          }
        );
    }
  }
}
