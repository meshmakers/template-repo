import { Provider, signal } from '@angular/core';
import { AuthorizeService } from '@meshmakers/shared-auth';

export const mockAuthService = {
  user: signal({}),
  userInitials: signal<string | null>('AB'),
  logout: vi.fn(),
};

export function provideAuthTesting(): Provider {
  return { provide: AuthorizeService, useValue: mockAuthService };
}
