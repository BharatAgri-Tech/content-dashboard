import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {forkJoin, Observable, of} from 'rxjs';
import {District, State, Taluka} from '../shared/models/common-models';
import {Feed, NotificationType} from '../feeds/feed-models';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
  params: new HttpParams()
};

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) {
  }

  feedsEndpoint = 'bharatagri/api/v1/';

  statesEndpoint = 'bharatagri/api/v1/state/?country=1';
  districtsEndpoint = 'bharatagri/api/v1/district/?state=';
  talukasEndpoint = 'bharatagri/api/v1/taluka/?district=';

  getNotificationTypes(): Observable<NotificationType[]> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.get<NotificationType[]>(`${environment.apiUrl}` + this.feedsEndpoint + `notificationtype`, httpOptions);
  }

  saveFeed(feed: Feed): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.post<any>(`${environment.apiUrl}` + this.feedsEndpoint + `push-bulk/`, feed, httpOptions);
  }

  getCropList(): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.get<any>(`${environment.apiUrl}`  + `weatherBasedAdvisory/get_list_of_crops_v2`, httpOptions);
  }

  getStates(): Observable<State[]> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.get<State[]>(`${environment.apiUrl}` + this.statesEndpoint, httpOptions);
  }

  getDistricts(stateId: string): Observable<District[]> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.get<District[]>(`${environment.apiUrl}` + this.districtsEndpoint + stateId, httpOptions);
  }

  getTalukas(districtId: string): Observable<Taluka[]> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'Token ' + localStorage.getItem('token'));
    return this.http.get<Taluka[]>(`${environment.apiUrl}` + this.talukasEndpoint + districtId, httpOptions);
  }

  saveImage(commonImage: any, image1: any, image2: any, image3: any): Observable<any> {
    let commonId;
    let id1;
    let id2;
    let id3;
    if (commonImage?.name !== undefined) {
      const uploadData = new FormData();
      uploadData.append('image', commonImage);
      uploadData.append('detail', commonImage.name);
      commonId = this.http.post(
        environment.apiUrl + 'bharatagri/api/v1/pop-image/',
        uploadData,
        {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token')
          }
        }
      ).pipe(catchError(error => of(error)));

      return forkJoin([commonId]);
    }
    if (image1?.name !== undefined) {
      console.log('in image 1');
      const uploadData = new FormData();
      uploadData.append('image', image1);
      uploadData.append('detail', image1.name);
      id1 = this.http.post(
        environment.apiUrl + 'bharatagri/api/v1/pop-image/',
        uploadData,
        {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token')
          }
        }
      ).pipe(catchError(error => of(error)));
      console.log(id1);
    }
    if (image2?.name !== undefined) {
      const uploadData = new FormData();
      uploadData.append('image', image2);
      uploadData.append('detail', image2.name);
      id2 = this.http.post(
        environment.apiUrl + 'bharatagri/api/v1/pop-image/',
        uploadData,
        {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token')
          }
        }
      ).pipe(catchError(error => of(error)));
    }
    if (image3?.name !== undefined) {
      const uploadData = new FormData();
      uploadData.append('image', image3);
      uploadData.append('detail', image3.name);
      id3 = this.http.post(
        environment.apiUrl + 'bharatagri/api/v1/pop-image/',
        uploadData,
        {
          headers: {
            Authorization: 'Token ' + localStorage.getItem('token')
          }
        }
      ).pipe(catchError(error => of(error)));
    }
    console.log(id1, id2, id3);
    if (id1 !== undefined && id2 !== undefined && id3 !== undefined) {
      return forkJoin([id1, id2, id3]);
    }
    if (id1 !== undefined && id2 !== undefined && id3 === undefined) {
      return forkJoin([id1, id2]);
    }
    if (id1 !== undefined && id2 === undefined && id3 !== undefined) {
      return forkJoin([id1, id3]);
    }
    if (id1 === undefined && id2 !== undefined && id3 !== undefined) {
      return forkJoin([id2, id3]);
    }
    if (id1 !== undefined && id2 === undefined && id3 === undefined) {
      return forkJoin([id1]);
    }
    if (id1 === undefined && id2 !== undefined && id3 === undefined) {
      return forkJoin([id2]);
    } else {
      return forkJoin([id3]);
    }
  }
}
