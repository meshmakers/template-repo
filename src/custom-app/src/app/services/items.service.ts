import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetItemsGQL } from '../graphQL/getItems.generated';
import { ItemRow, mapItems } from '../models/items';

/** Reads the items of the tenant. Errors are not swallowed: the caller shows them and offers a retry. */
@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private readonly getItemsGQL = inject(GetItemsGQL);

  loadItems(first = 100): Observable<ItemRow[]> {
    return this.getItemsGQL
      .fetch({ variables: { first }, fetchPolicy: 'network-only', errorPolicy: 'none' })
      .pipe(map((result) => mapItems(result.data)));
  }
}
