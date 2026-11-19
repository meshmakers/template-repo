import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GetMaintenanceModeDtoGQL } from '../graphQL/getMaintenanceMode.generated';

@Injectable({
  providedIn: 'root',
})
export class MaintenanceModeService {
  private readonly getMaintenanceModeGQL = inject(GetMaintenanceModeDtoGQL);
  private readonly maintenanceModeSubject = new BehaviorSubject<boolean>(false);
  readonly maintenanceMode$ = this.maintenanceModeSubject.asObservable();

  private readonly checkInterval = 30000;

  constructor() {
    this.startMaintenanceModeCheck();
  }

  private startMaintenanceModeCheck(): void {
    timer(0, this.checkInterval)
      .pipe(switchMap(() => this.checkMaintenanceMode()))
      .subscribe((isInMaintenance) => {
        this.maintenanceModeSubject.next(isInMaintenance);
      });
  }

  checkMaintenanceMode(): Observable<boolean> {
    return this.getMaintenanceModeGQL
      .fetch({ variables: {}, fetchPolicy: 'network-only' })
      .pipe(
        map((result) => {
          const edges = result.data?.runtime?.systemTenantModeConfiguration?.edges;
          if (edges && edges.length > 0) {
            const maintenanceLevel = edges[0]?.node?.maintenanceLevel;
            return maintenanceLevel === 'USER_APPS' || maintenanceLevel === 'FULL_SYSTEM';
          }
          return false;
        }),
        catchError(() => of(false)),
      );
  }

  isInMaintenanceMode(): boolean {
    return this.maintenanceModeSubject.value;
  }
}
