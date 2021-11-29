import { Component, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';

interface Response {
  name: string;
  value: any;
}

// see https://github.com/manfredsteyer/angular-oauth2-oidc/blob/master/projects/lib/src/encoder.ts
export class WebHttpUrlEncodingCodec implements HttpParameterCodec {
  encodeKey(k: string): string {
    return encodeURIComponent(k);
  }

  encodeValue(v: string): string {
    return encodeURIComponent(v);
  }

  decodeKey(k: string): string {
    return decodeURIComponent(k);
  }

  decodeValue(v: string) {
    return decodeURIComponent(v);
  }
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnDestroy {

  private responses: BehaviorSubject<Response[]> = new BehaviorSubject<Response[]>([]);

  responses$: Observable<Response[]> = this.responses.asObservable();

  constructor(private httpClient: HttpClient, private http: HTTP) {
    this.httpClient
      .post(
        'https://httpbin.org/post',
        {
          params: new HttpParams().append('a', '1').append('a', '2'),
        },
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
          }),
        },
      )
      .subscribe((data) => {
        // this.append('Example 1', data);
      });

    const formData = new FormData();
    formData.append('attr1', 'Attribute One');
    formData.append('attr2', 'Attribute Two');
    this.httpClient.post('https://httpbin.org/post', formData).subscribe((data) => {
      //this.append('FormData', data);
    });

    const httpParams = new HttpParams({encoder: new WebHttpUrlEncodingCodec()})
      .set('client_id', 'my-client-id')
      .set('username', 'my-username')
      .set('password', 'my-password');
    this.httpClient.post('https://httpbin.org/post', httpParams).subscribe((data) => {
      this.append('HttpParams (custom encoder)', data);
    });

    const httpParams2 = new HttpParams()
      .set('client_id', 'my-client-id')
      .set('username', 'my-username')
      .set('password', 'my-password');
    this.httpClient.post('https://httpbin.org/post', httpParams2).subscribe((data) => {
      this.append('HttpParams', data);
    });
  }

  ngOnDestroy(): void {
    this.responses.complete();
  }

  private append(name: string, value: any): void {
    this.responses.next(this.responses.getValue().concat([{name, value}]));
  }
}
