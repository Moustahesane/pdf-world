import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestApiServiceService } from '../rest-api-service.service';
@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent implements OnInit {
  file;
  constructor(private rest : RestApiServiceService ) { }

  ngOnInit(): void {
  }

  tiffFileChange(e){
    this.file = e.target.files[0];


  }
  blobToArryBuffer(base64)
  {
    const byteCharacters = atob(base64.split(',')[1]);
    const len = byteCharacters.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = byteCharacters.charCodeAt(i);
    }
    return bytes.buffer;


  }
  documentConvert() {
    const formData: FormData = new FormData();
    formData.append('file', this.file);
    this.rest.convertTopdf(formData).subscribe(
      res => {
       let elem = document.getElementById('download') as HTMLAnchorElement;
       elem.download=`file${new Date().getTime()}.pdf`
       elem.href = 'data:application/pdf;base64,'+res['base64']; 
       
       elem.dispatchEvent(new Event('click'));
      },
      err => {
        console.log(err)
      });
  }


}
