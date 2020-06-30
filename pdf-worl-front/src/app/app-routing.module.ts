import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConvertComponent } from './convert/convert.component';
import { CertifComponent } from './certif/certif.component';


const routes: Routes = [
  // {path : '', redirectTo : 'convertir'},
  // {path : 'convertir', component : ConvertComponent },
  // {path : 'certifier', component : CertifComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
