import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AvatarComponent} from "./avatar/avatar.component";
import {SvgButtonComponent} from "./svg-button/svg-button.component";
import {SvgComponent} from "./svg/svg.component";
import {ChipComponent} from "./chip/chip.component";
import {AlertComponent} from "./alert/alert.component";
import {HomeScreenComponent} from "./home-screen/home-screen.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AvatarComponent, SvgButtonComponent, SvgComponent, ChipComponent, AlertComponent, HomeScreenComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tailwind-dev-day';

  onClose(): void {
    alert("chip was closed");
  }
}
