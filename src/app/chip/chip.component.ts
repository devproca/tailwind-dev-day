import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AvatarComponent} from "../avatar/avatar.component";
import {SvgButtonComponent} from "../svg-button/svg-button.component";

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [
    AvatarComponent,
    SvgButtonComponent
  ],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss'
})
export class ChipComponent {
  @Input() label: string = "";
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
  
  /*
  Fill in the rest of this component, the html and the scss.
 */

  /*

    Use this function to populate the avatar text

    null             -> ''
    Hello            -> H
    Hello world      -> HW
    Hello big world  -> HB

   */
  get firstLetters(): string {
    return !this.label ? '' : this.label.split(/\s/)
      .reduce((response, word) => response += word.slice(0, 1), '')
      .toUpperCase()
      .slice(0, 2);
  }
}
