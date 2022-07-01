import { MainPageComponent } from './pages/main-page/main-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: ':country/:city', component: MainPageComponent },
  // { path: '**', component: PageNotFoundComponent },  TODO: Error Handling
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
