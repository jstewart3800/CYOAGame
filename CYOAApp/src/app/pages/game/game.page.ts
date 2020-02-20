import { Component, OnInit } from '@angular/core';
import { SceneService } from 'src/app/services/scene.service';

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
      x => {console.log(x.feed.entry)
      for (let sceneInQuestion of x.feed.entry) {
        let nextScene = {
          id: sceneInQuestion.gsx$id.$t,
          sceneText: sceneInQuestion.gsx$scene.$t
        };
        this.myScenes.push(nextScene);
        console.log(this.myScenes);
      }
      });
   }

  ngOnInit() {
  }

}
