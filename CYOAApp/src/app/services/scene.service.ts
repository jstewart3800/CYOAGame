import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scene } from '../interfaces/scene';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  private sceneUrl = 'https://spreadsheets.google.com/feeds/list/1EYzV84AbTPH4ACZ6iyNPRkpDEowlWcyQ3tQv-hleIxs/1/public/full?alt=json'
  private endingUrl = 'https://spreadsheets.google.com/feeds/list/1EYzV84AbTPH4ACZ6iyNPRkpDEowlWcyQ3tQv-hleIxs/2/public/full?alt=json'
  private sceneSheet;
  private endingSheet;
  private allScenes: Scene[] = [];
  private audio = new Audio();
  constructor(private http: HttpClient) { 
    this.getScenesMKII();
  }

  getScenesMKII() {
    this.sceneSheet = this.http.get(this.sceneUrl);
    this.sceneSheet.subscribe(
      x => {
        console.log(x);
        for (let s of x.feed.entry) {
          let nextScene: Scene = {
            id: s.gsx$id.$t as number,
            sceneText: s.gsx$scene.$t,
            choice1: s.gsx$choice1.$t,
            choice2: s.gsx$choice2.$t,
            choice3: s.gsx$choice3.$t,
            result1: s.gsx$result1.$t as number,
            result2: s.gsx$result2.$t as number,
            result3: s.gsx$result3.$t as number ,
            ending: s.gsx$ending.$t as boolean
          }
          this.allScenes.push(nextScene);

        }
        console.log(this.allScenes);
      });
    return this.allScenes;
  }

  getEndings() {
    // <--------------------------------------------------- Work needed
  }

  getNextScene(id: number): Scene {
    return this.allScenes[id-1]
  }

  getFirstScene(): Scene {
    return this.allScenes[0]
  }

  playMusic() {
    this.audio.src = ''; //insert music url here
    this.audio.autoplay = true;
  }
}
