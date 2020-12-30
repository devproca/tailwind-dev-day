import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-svg-button',
  templateUrl: './svg-button.component.html',
  styleUrls: ['./svg-button.component.scss']
})
export class SvgButtonComponent {

  @Input() name: string;
  @Output() click = new EventEmitter<void>();

  onClick(): void {
    this.click.emit();
  }
}
