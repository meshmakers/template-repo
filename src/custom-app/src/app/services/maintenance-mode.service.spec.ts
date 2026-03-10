import { of, throwError, firstValueFrom, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Tests the maintenance mode check logic extracted from MaintenanceModeService.
 * The service uses Angular's inject() which makes direct instantiation difficult in vitest,
 * so we test the core logic (the GraphQL result mapping) independently.
 */
describe('MaintenanceModeService logic', () => {
  function createMockResult(maintenanceLevel: string) {
    return {
      data: {
        runtime: {
          systemTenantModeConfiguration: {
            edges: [
              {
                node: {
                  rtId: '123',
                  maintenanceLevel,
                  environmentMode: 'PRODUCTION',
                },
              },
            ],
          },
        },
      },
    };
  }

  // Extracted logic from MaintenanceModeService.checkMaintenanceMode
  function checkMaintenanceMode(fetchResult$: Observable<{ data: unknown }>): Observable<boolean> {
    return fetchResult$.pipe(
      map((result) => {
        const edges = (result.data as Record<string, unknown> as { runtime?: { systemTenantModeConfiguration?: { edges?: { node?: { maintenanceLevel: string } | null }[] | null } | null } | null })?.runtime?.systemTenantModeConfiguration?.edges;
        if (edges && edges.length > 0) {
          const maintenanceLevel = edges[0]?.node?.maintenanceLevel;
          return maintenanceLevel === 'USER_APPS' || maintenanceLevel === 'FULL_SYSTEM';
        }
        return false;
      }),
      catchError(() => of(false)),
    );
  }

  it('should detect USER_APPS as maintenance mode', async () => {
    const result = await firstValueFrom(checkMaintenanceMode(of(createMockResult('USER_APPS'))));
    expect(result).toBe(true);
  });

  it('should detect FULL_SYSTEM as maintenance mode', async () => {
    const result = await firstValueFrom(checkMaintenanceMode(of(createMockResult('FULL_SYSTEM'))));
    expect(result).toBe(true);
  });

  it('should not detect OFF as maintenance mode', async () => {
    const result = await firstValueFrom(checkMaintenanceMode(of(createMockResult('OFF'))));
    expect(result).toBe(false);
  });

  it('should return false for empty edges', async () => {
    const result = await firstValueFrom(
      checkMaintenanceMode(
        of({
          data: {
            runtime: {
              systemTenantModeConfiguration: { edges: [] },
            },
          },
        }),
      ),
    );
    expect(result).toBe(false);
  });

  it('should return false on error', async () => {
    const result = await firstValueFrom(
      checkMaintenanceMode(throwError(() => new Error('Network error'))),
    );
    expect(result).toBe(false);
  });
});
