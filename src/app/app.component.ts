import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AvatarComponent} from "./avatar/avatar.component";
import {SvgButtonComponent} from "./svg-button/svg-button.component";
import {SvgComponent} from "./svg/svg.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AvatarComponent, SvgButtonComponent, SvgComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tailwind-dev-day';
}
