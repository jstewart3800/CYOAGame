import { Component, OnInit } from '@angular/core';
import { SceneService } from 'src/app/services/scene.service';
import { Scene } from 'src/app/interfaces/scene';
import { Ending } from 'src/app/interfaces/ending';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  displayScene: Scene;
  displayEnd: Ending;
  endingNext: boolean = false;

  constructor(private sService: SceneService) { }

  ngOnInit() {
    this.displayScene = this.sService.getFirstScene();
  }

  nextScene(id: number) {
    if (this.displayScene.ending === true) {
      this.endingNext = true;
      console.log(this.endingNext);
      this.displayEnd = this.sService.getYourEnding(id);
    } else {
      this.displayScene = this.sService.getNextScene(id)
    }
  }

}
