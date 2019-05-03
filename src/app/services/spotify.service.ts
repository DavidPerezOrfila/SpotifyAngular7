import { map } from 'rxjs/internal/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {
    console.log('Spotify service listo');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({ Authorization:
        // tslint:disable-next-line:max-line-length
        'Bearer BQBJe0QlRA2L8-8sxj_rF_GvLH5MqrlAyDWmwIB2zlsXp6u38Vf9Qfuk-74YfxryEcWWxbjcJgelDd7pbLs' });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    /* const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
      Authorization:
        'Bearer BQBM84nMi7yCsPq3sLeqGPQ1GMIkvpVFCY8iyaHPSyBv4vew3Dt07rFS9cQpRlbhWiwgP_Y9ZBtznuOZTto'
    });

    return this.http.get('https://api.spotify.com/v1/browse/new-releases', {
      headers
    }).pipe(map(data => data['albums'].items)); */

    return this.getQuery('browse/new-releases?limit=20').pipe(
      map(data => data['albums'].items)
    );
  }

  getArtistas(termino: string) {

    return this.getQuery(`search?q=${termino}&type=artist&limit=15`).pipe(
      map(data => data['artists'].items)
    );
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    // .pipe(map(data => data['artists'].items));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks/?country=ES`)
    .pipe(map(data => data['tracks']));
  }
}
