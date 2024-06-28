import {Component, Input, ViewEncapsulation} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-svg',
  standalone: true,
  imports: [],
  templateUrl: './svg.component.html',
  styleUrl: './svg.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class SvgComponent {
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
