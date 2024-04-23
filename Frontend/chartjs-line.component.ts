import { Component, OnDestroy } from '@angular/core';
// import { NbThemeService, NbColorHelper } from '@nebular/theme'; 
// import { DashService } from '../../dashboard/dash.service';
const Swal = require('sweetalert2');
@Component({
    selector: 'ngx-chartjs-line',
    template:
      `
      <div>
    <div class="input-group col-md-11">
      <span class="input-group-addon">start date:</span>&nbsp;&nbsp;&nbsp;
      <angular2-date-picker [(ngModel)]="dateDebut" [settings]="settings"></angular2-date-picker>&nbsp;&nbsp;&nbsp;
      <span class="input-group-addon">Finish date:</span>&nbsp;&nbsp;&nbsp;
      <angular2-date-picker [(ngModel)]="dateFin" [settings]="settings"></angular2-date-picker>&nbsp;&nbsp;&nbsp;
      <span class="input-group-btn">&nbsp;&nbsp;
            <button type="button" value="Click" (click)="getDateValues()" id='btn' class="btn btn-info btn-flat"> ok </button>
          </span>
    </div>
  </div>
  <chart type="line" [data]="data" [options]="options"></chart>
`,
})
export class ChartjsLineComponent implements OnDestroy {

    data: any;
    options: any;
    themeSubscription: any;
    dateDebut: Date = new Date();
    dateFin: Date = new Date();
    DataTableOne = [];
    DataTableTwo = [];
    BatteryLevel = [];
    
    
  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'hh:mm dd-MM-yyyy',
    defaultOpen: false,
  };

  ngOnDestroy(){
    
  }
  
}