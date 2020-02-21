import { Component, OnInit } from '@angular/core';
import { SceneService } from 'src/app/services/scene.service';
import { Scene } from 'src/app/interfaces/scene';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  myScenes = [];

  // Might need some tweaking
  constructor(private sService: SceneService) {
    sService.getScenes().subscribe(
      x => {
        console.log(x.feed.entry)
        for (let sceneInQuestion of x.feed.entry) {
          let nextScene: Scene = {
            id: sceneInQuestion.gsx$id.$t,
            sceneText: sceneInQuestion.gsx$scene.$t,
            choice1: sceneInQuestion.gsx$choice1.$t,
            choice2: sceneInQuestion.gsx$choice2.$t,
            choice3: sceneInQuestion.gsx$choice3.$t,
            result1: sceneInQuestion.gsx$result1.$t,
            result2: sceneInQuestion.gsx$result2.$t,
            result3: sceneInQuestion.gsx$result3.$t,
            ending: sceneInQuestion.gsx$ending.$t
          };
          this.myScenes.push(nextScene);
        }
        console.log(this.myScenes);
      });
  }

  ngOnInit() {
  }

}
