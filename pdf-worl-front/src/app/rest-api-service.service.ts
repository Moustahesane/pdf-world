import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const httpOptions = {
  'responseType'  : 'arraybuffer' as 'json'
   //'responseType'  : 'blob' as 'json'        //This also worked
};
@Injectable({
  providedIn: 'root'
})

export class RestApiServiceService {
  convertTopdf(formData: FormData) {
    return this.http.post<ArrayBuffer>(`http://127.0.0.1:8080/convert`,formData,{})
  }

  constructor(private http: HttpClient) { }
}
