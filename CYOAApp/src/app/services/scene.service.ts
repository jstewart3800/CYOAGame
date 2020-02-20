import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  url = 'https://spreadsheets.google.com/feeds/list/1EYzV84AbTPH4ACZ6iyNPRkpDEowlWcyQ3tQv-hleIxs/1/public/full?alt=json'
  constructor(private http: HttpClient) { }

  getScenes() {
    return this.http.get<any>(this.url);
  }
}
