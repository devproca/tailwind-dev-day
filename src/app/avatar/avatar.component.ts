import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  styles: [`
    :host {
      display: inline-block;
    }
  `
  ]
})
export class AvatarComponent {

  @Input() label: string;
}
