import { Component } from '@angular/core';
import { SceneService } from '../services/scene.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private sService: SceneService) {
    // sService.playMusic();
  }

   

}
