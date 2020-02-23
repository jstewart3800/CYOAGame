import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scene } from '../interfaces/scene';
import { Ending } from '../interfaces/ending';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  private sceneUrl = 'https://spreadsheets.google.com/feeds/list/1EYzV84AbTPH4ACZ6iyNPRkpDEowlWcyQ3tQv-hleIxs/1/public/full?alt=json'
  private endingUrl = 'https://spreadsheets.google.com/feeds/list/1EYzV84AbTPH4ACZ6iyNPRkpDEowlWcyQ3tQv-hleIxs/2/public/full?alt=json'

  private sceneSheet;
  private endingSheet;

  private allScenes: Scene[] = [];
  private allEndings: Ending[] = [];

  private audio = new Audio();

  constructor(private http: HttpClient) { 
    this.getScenesMKII();
    this.getEndings();
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
            result1: s.gsx$result1.$t,
            result2: s.gsx$result2.$t,
            result3: s.gsx$result3.$t,
            ending: s.gsx$ending.$t.toLowerCase() as boolean
          }
          this.allScenes.push(nextScene);

        }
        console.log(this.allScenes);
      });
    return this.allScenes;
  }

  getEndings() {
    this.endingSheet = this.http.get(this.endingUrl);
    this.endingSheet.subscribe(
      x => {
        console.log(x);
        for (let e of x.feed.entry) {
          let nextEnding: Ending = {
            ending: e.gsx$endingtext.$t,
            endNum: e.gsx$endingnum.$t as number
          }
          this.allEndings.push(nextEnding);
        }
        console.log(this.allEndings);
      });
  }

  getNextScene(id: number): Scene {
    return this.allScenes[id-1]
  }

  getFirstScene(): Scene {
    return this.allScenes[0]
  }

  getYourEnding(endNum: number): Ending {
    return this.allEndings[endNum-5]
  }

  playMusic() {
    this.audio.src = ''; //insert music url here
    this.audio.autoplay = true;
  }
}
