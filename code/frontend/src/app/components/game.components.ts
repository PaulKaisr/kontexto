import {Component, input} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {GuessInput} from './guess-input/guess-input.component';
import {Menu} from 'primeng/menu';

@Component({
  selector: 'game',
  standalone: true,
  templateUrl: './game.component.html',
  imports: [ButtonModule, GuessInput, Menu]
})
export class Game {
  guess = input.required<string>();
  answer = input.required<string>();

  menuItems = [
    {
      label: 'Options',
      items: [
        {
          label: 'Refresh',
          icon: 'pi pi-refresh'
        },
        {
          label: 'Export',
          icon: 'pi pi-upload'
        }
      ]
    }
  ];
}
