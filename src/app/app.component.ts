import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AvatarComponent} from "./avatar/avatar.component";
import {SvgComponent} from "./svg/svg.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AvatarComponent, SvgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tailwind-dev-day';
}
