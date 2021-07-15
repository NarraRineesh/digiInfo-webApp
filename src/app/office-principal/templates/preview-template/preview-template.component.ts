import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Template } from '../template';

@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.css']
})
export class PreviewTemplateComponent implements OnInit {
  template: Template;

  constructor(private router:Router) { 
    this.template  = this.router.getCurrentNavigation().extras.state.template;
    console.log(this.template);
    
  }

  ngOnInit(): void {
    
  }

}
