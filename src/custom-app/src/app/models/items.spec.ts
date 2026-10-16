import { GetItemsQuery } from '../graphQL/getItems.generated';
import { deriveViewState, ItemRow, mapItems, statusLabel } from './items';

type GqlItems = NonNullable<
  NonNullable<NonNullable<GetItemsQuery['runtime']>['customAppItem']>['items']
>;

function result(items: GqlItems): GetItemsQuery {
  return { runtime: { customAppItem: { totalCount: items.length, items } } };
}

describe('statusLabel', () => {
  it('labels the enum values of the item status', () => {
    expect(statusLabel('DRAFT')).toBe('Draft');
    expect(statusLabel('ACTIVE')).toBe('Active');
    expect(statusLabel('ARCHIVED')).toBe('Archived');
  });

  it('labels the numeric keys and tolerates other spellings', () => {
    expect(statusLabel(1)).toBe('Active');
    expect(statusLabel('2')).toBe('Archived');
    expect(statusLabel('Active')).toBe('Active');
  });

  it('shows unknown values as they are and empty values as empty', () => {
    expect(statusLabel('SOMETHING_NEW')).toBe('SOMETHING_NEW');
    expect(statusLabel(null)).toBe('');
    expect(statusLabel(undefined)).toBe('');
  });
});

describe('mapItems', () => {
  it('maps the example item of the blueprint seed', () => {
    const rows = mapItems(
      result([{ rtId: '6a0000000000000000000001', name: 'Example Item', code: 'ITEM-0001', quantity: 1, status: 'ACTIVE' }]),
    );
    expect(rows).toEqual([
      { rtId: '6a0000000000000000000001', name: 'Example Item', code: 'ITEM-0001', quantity: 1, status: 'Active' },
    ]);
  });

  it('skips null entries and keeps a missing quantity as null', () => {
    const rows = mapItems(result([null, { rtId: '1', name: 'A', code: 'C', status: 'DRAFT' }]));
    expect(rows).toHaveLength(1);
    expect(rows[0].quantity).toBeNull();
    expect(rows[0].status).toBe('Draft');
  });

  it('returns no rows for an empty or missing result', () => {
    expect(mapItems(result([]))).toEqual([]);
    expect(mapItems({ runtime: null })).toEqual([]);
    expect(mapItems(null)).toEqual([]);
    expect(mapItems(undefined)).toEqual([]);
  });
});

describe('deriveViewState', () => {
  const row: ItemRow = { rtId: '1', name: 'A', code: 'C', quantity: 1, status: 'Active' };

  it('is loading while the query runs, even with old rows', () => {
    expect(deriveViewState(true, false, [row])).toBe('loading');
  });

  it('is error when the query failed, never empty', () => {
    expect(deriveViewState(false, true, [])).toBe('error');
  });

  it('is empty without rows and data with rows', () => {
    expect(deriveViewState(false, false, [])).toBe('empty');
    expect(deriveViewState(false, false, [row])).toBe('data');
  });
});
