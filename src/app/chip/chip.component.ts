import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {

  @Input() label: string;

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

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
