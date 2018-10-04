import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsEventsService } from '@j2xT/shared/services';
import {TranslateService} from "@ngx-translate/core";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public selectedLang = 'fr_FR';
  public languages = [
    {locale: 'fr_FR', value: 'PUBLIC.LANGUAGES.FR'},
    {locale: 'en_EN', value: 'PUBLIC.LANGUAGES.EN'}
  ]

  constructor(public _gaEvents: GoogleAnalyticsEventsService,
              private translate: TranslateService) {}

  ngOnInit() {}

  useLanguage(language: string) {
    this.translate.use(language);
  }
}
