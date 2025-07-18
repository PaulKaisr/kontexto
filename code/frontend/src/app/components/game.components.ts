import {Component} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {SpeedDial} from 'primeng/speeddial';

@Component({
  selector: 'game',
  standalone: true,
  templateUrl: './game.component.html',
  imports: [ButtonModule, SpeedDial]
})
export class Game {
  menuItems = [
    {label: 'New Game', icon: 'pi pi-plus', command: () => alert('New Game')},
    {label: 'Settings', icon: 'pi pi-cog', command: () => alert('Settings')},
    {label: 'Help', icon: 'pi pi-question', command: () => alert('Help')}
  ];
}
