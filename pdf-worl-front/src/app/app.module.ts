import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConvertComponent } from './convert/convert.component';
import { CertifComponent } from './certif/certif.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CertEditorComponent } from './cert-editor/cert-editor.component';
import { DocumentSignedComponent } from './document-signed/document-signed.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UploadSignatureComponent } from './upload-signature/upload-signature.component';

@NgModule({
  declarations: [
    AppComponent,
    ConvertComponent,
    CertifComponent,
    CertEditorComponent,
    DocumentSignedComponent,
    UploadSignatureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbModule,
    NgbModule
  ],
  providers: [

    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
