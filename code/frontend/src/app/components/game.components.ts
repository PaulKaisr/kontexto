import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'game',
  standalone: true,
  templateUrl: './game.component.html',
  imports: [ButtonModule]
})
export class Game {
}
