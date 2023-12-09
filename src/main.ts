/// <reference types="@angular/localize" />

import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppRoutingModule } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(AppRoutingModule, HttpClientModule, Router, RouterLink),
    provideAnimations(),
  ],
});
