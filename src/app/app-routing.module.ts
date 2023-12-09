import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signUp/signUp.component';

import { CreateCardComponent } from './components/dashboard/storedashboard/mainstore/allstore/createCardComponent/create-card/create-card.component';
import { isLoginGuard } from './guard/auth.guard';
import { MainstoreComponent } from './components/dashboard/storedashboard/mainstore/mainstore.component';
import { isAdminGuard } from './guard/admin.guard';
import { CreateStoreComponent } from './components/dashboard/create-store.component';
import { StoreComponent } from './components/dashboard/storedashboard/mainstore/allstore/store/store.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [isLoginGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '', redirectTo: 'mainStore', pathMatch: 'full' },

      {
        path: 'mainStore',
        component: MainstoreComponent,
      },
      { path: 'store/:storeId', component: StoreComponent },
    ],
  },

  {
    path: 'createCard/:storeId',
    component: CreateCardComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: 'createStore',
    component: CreateStoreComponent,
    canActivate: [isAdminGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'signUp', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterLink],
  exports: [RouterModule],
})
export class AppRoutingModule {}
