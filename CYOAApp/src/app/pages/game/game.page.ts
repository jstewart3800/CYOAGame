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
  displayScene: Scene;

  // Might need some tweaking
  constructor(private sService: SceneService) { }

  ngOnInit() {
    this.displayScene = this.sService.getFirstScene()
  }

  nextScene(id: number) {
    if (this.displayScene.ending === true) {
      //ENDING STUFF
    } else {
      this.displayScene = this.sService.getNextScene(id)
    }
  }

}
