import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private httpClient: HttpClient, private http: HTTP) {
    this.httpClient
      .post('https://httpbin.org/post', new HttpParams().append('a', 'b'))
      .subscribe();
  }
}
