import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Component({
  selector: 'app-svg-button',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: [],
  templateUrl: './svg-button.component.html',
  styleUrl: './svg-button.component.scss'
})
export class SvgButtonComponent implements OnInit {
  @Input() name: string = "";

  svg: SafeHtml | undefined;

  constructor(private sanitizer: DomSanitizer,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadSvg(`assets/svg/${this.name}.svg`).subscribe(svg => {
      this.svg = this.sanitizer.bypassSecurityTrustHtml(svg);
    });
  }

  loadSvg(filePath: string): Observable<string> {
    return this.http.get(filePath, {responseType: 'text'});
  }
}
