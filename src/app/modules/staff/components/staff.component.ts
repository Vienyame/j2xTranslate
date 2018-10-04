import { Component, OnInit } from '@angular/core';
import { PageInfoService } from '@j2xT/shared/services';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'syc-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit {

  constructor(private pageInfoService: PageInfoService) { }

  ngOnInit() {
  }

}
