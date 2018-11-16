import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URL_API_BASE} from '../../constants';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  search(terms: Observable<string>) {
    return terms.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => this.getSearchResult(term))
    );
  }

  getSearchResult(term): Observable<any> {
    const route: any = URL_API_BASE;
    // dataset=liste-des-commerces-de-proximite-agrees-ratp&sort=code_postal&facet=tco_libelle&facet=code_postal
    const params = new HttpParams().set('dataset', term)
      .set('sort', 'code_postal')
      .set('facet', 'tco_libelle')
      .set('facet', 'code_postal')
      .set('rows', '40');

    return this.http.get(route, {params: params});
  }
}
