import {Component} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'guess-input',
  standalone: true,
  templateUrl: './guess-input.component.html',
  imports: [InputText, FormsModule]
})
export class GuessInput {
  guess: string | undefined = undefined;

  submitGuess() {
    console.log(this.guess);
  }
}
