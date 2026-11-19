import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { provideTranslateTesting } from '../../../testing/translate-providers';
import { ItemsService } from '../../sample/items.service';
import { SAMPLE_ITEMS, SAMPLE_ITEMS_ENABLED } from '../../sample/sample-items.config';
import { HomeComponent } from './home';

describe('HomeComponent sample switch', () => {
  // sampleEnabled undefined: no override, the component reads SAMPLE_ITEMS_ENABLED through the token.
  // The tests must stay green whichever value a developer sets there (README, "With the sample model").
  function create(sampleEnabled?: boolean) {
    const loadItems = vi.fn(() => of([]));
    TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideTranslateTesting(),
        ...(sampleEnabled === undefined ? [] : [{ provide: SAMPLE_ITEMS, useValue: sampleEnabled }]),
        { provide: ItemsService, useValue: { loadItems } },
      ],
    });
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    return { fixture, loadItems, element: fixture.nativeElement as HTMLElement };
  }

  it('follows SAMPLE_ITEMS_ENABLED when nothing overrides the token', () => {
    const { loadItems, element } = create();

    expect(TestBed.inject(SAMPLE_ITEMS)).toBe(SAMPLE_ITEMS_ENABLED);
    expect(loadItems).toHaveBeenCalledTimes(SAMPLE_ITEMS_ENABLED ? 1 : 0);
    expect(element.querySelector('[data-testid="sample-off"]') === null).toBe(SAMPLE_ITEMS_ENABLED);
  });

  it('does not query the sample items when the sample is off and shows the hint', () => {
    const { loadItems, element } = create(false);

    expect(loadItems).not.toHaveBeenCalled();
    expect(element.querySelector('[data-testid="sample-off"]')).not.toBeNull();
    expect(element.querySelector('kendo-grid')).toBeNull();
  });

  it('queries the sample items when the sample is on', () => {
    const { fixture, loadItems, element } = create(true);

    expect(loadItems).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.state()).toBe('empty');
    expect(element.querySelector('[data-testid="sample-off"]')).toBeNull();
  });
});
