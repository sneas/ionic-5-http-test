import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public nativeResponse: any;
  public httpResponse: any;
  constructor(private httpClient: HttpClient, private http: HTTP) {
    this.http.setCookie('https://httpbin.org/delete', 'cookie=shmookie');

    this.httpClient
      .delete('https://httpbin.org/delete?with=%20wierd%20variables%20', {
        params: new HttpParams().append('a', '1').append('a', '2'),
      })
      .subscribe((data) => {
        this.httpResponse = data;
      });

    this.http
      .sendRequest('https://httpbin.org/get?a=1&a=2', {
        method: 'get',
      })
      .then((data) => {
        this.nativeResponse = data;
      });
  }
}
