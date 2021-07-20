import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { MisService } from 'src/app/shared/services/mis.service';
@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.css']
})
export class MisComponent implements OnInit {
  loading: boolean = false;
  Mis: any[];

  constructor(private location: Location, private mis: MisService) { }

  ngOnInit(): void {
  }
  getMis(){
    this.loading = true
    this.mis.getMisList().subscribe(res => {
      const miss = res.map( e => {
        return {
          id: e.payload.doc.id,
          data:e.payload.doc.data()
        } as any;
      })
      console.log(miss);
      
            // this.Mis = miss.filter(s => s.data.role === 'student');

      this.loading = false
    }); 
  }
  routeBack(){
    this.location.back()
  }

}
