import {Component, Input} from '@angular/core';
import {SvgComponent} from "../svg/svg.component";


@Component({
  selector: 'app-svg-button',
  standalone: true,
  imports: [
    SvgComponent
  ],
  templateUrl: './svg-button.component.html',
  styleUrl: './svg-button.component.scss'
})
export class SvgButtonComponent {
  @Input() name: string = "";
}
