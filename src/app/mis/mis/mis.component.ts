import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.css']
})
export class MisSubComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }
  routeBack(){
    this.location.back()
  }

}
