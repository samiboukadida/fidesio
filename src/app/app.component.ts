import {Component} from '@angular/core';
import {ApiService} from './services/api/api.service';
import {Subject} from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  source: any =
    {
      localdata: [],
      datatype: 'array',
      datafields:
        [
          {name: 'ville', type: 'string'},
          {name: 'tco_libelle', type: 'string'},
          {name: 'code_postal', type: 'number'},

        ],
      sortcolumn: ['ville', 'tco_libelle', 'code_postal'],
      sortdirection: 'asc'
    };

  dataAdapter: any = new jqx.dataAdapter(this.source);

  columns: any[] =
    [
      {text: 'Ville', dataField: 'ville', width: 200},
      {text: 'Libellé', dataField: 'tco_libelle', width: 200},
      {text: 'Code Postal', editable: false, dataField: 'code_postal', width: 180}
    ];

  records = [];
  searchTerm$ = new Subject<string>();

  constructor(private apiService: ApiService) {

    this.apiService.search(this.searchTerm$)
      .subscribe(response => {
        this.records = response.records;
        console.log('response.records:', response.records);
        this.source.localdata = _.map(response.records, (item) => {
          return _.pick<any>(item.fields, ['ville', 'tco_libelle', 'code_postal']);
        });
        console.log('localdata:', this.source.localdata);
        this.dataAdapter = new jqx.dataAdapter(this.source);
      });
  }

}
