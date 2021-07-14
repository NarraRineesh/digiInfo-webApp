import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoaderService } from './loader.service';
@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],

})
export class LoaderComponent implements OnInit {

    loading: boolean;

    constructor(private loaderService: LoaderService, private spinner: NgxSpinnerService) {

        this.loaderService.isLoading.subscribe((v) => {
            this.loading = v;
        });

    }
    ngOnInit() {
        this.spinner.show()
    }

}