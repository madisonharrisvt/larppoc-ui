import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersComponent } from './characters/characters.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin-view', pathMatch: 'full' },
  { path: 'characters', component: CharactersComponent },
  { path: 'admin-view', component: AdminViewComponent },
  { path: 'detail/:id', component: CharacterDetailComponent }
]

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {}