import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PageInfoService } from '@j2xT/shared/services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'syc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  appName = 'Shaka';
  constructor(private pageInfoService: PageInfoService) {}

  ngOnInit() {
  }
}
