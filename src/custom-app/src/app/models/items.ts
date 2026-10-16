import { GetItemsQuery } from '../graphQL/getItems.generated';

/** One row of the items table on the home page. */
export interface ItemRow {
  rtId: string;
  name: string;
  code: string;
  quantity: number | null;
  /** Human-readable status, see {@link statusLabel}. */
  status: string;
}

/** The four states of the items table. */
export type ItemsViewState = 'loading' | 'empty' | 'error' | 'data';

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Draft',
  ACTIVE: 'Active',
  ARCHIVED: 'Archived',
};

const STATUS_BY_KEY: Record<string, string> = {
  '0': 'Draft',
  '1': 'Active',
  '2': 'Archived',
};

/**
 * Turns the status of an item into a readable label. The API returns the enum value
 * (for example `ACTIVE`, in some contexts the key `1`); unknown values are shown as they are.
 */
export function statusLabel(status: string | number | null | undefined): string {
  if (status === null || status === undefined || status === '') {
    return '';
  }
  const text = String(status);
  return (
    STATUS_BY_KEY[text] ??
    STATUS_LABELS[text.replace(/[\s-]/g, '_').toUpperCase()] ??
    text
  );
}

/** Maps the GraphQL result to table rows; null entries are skipped. */
export function mapItems(data: GetItemsQuery | null | undefined): ItemRow[] {
  const items = data?.runtime?.customAppItem?.items ?? [];
  return items
    .filter((item): item is NonNullable<typeof item> => !!item)
    .map((item) => ({
      rtId: item.rtId,
      name: item.name,
      code: item.code,
      quantity: item.quantity ?? null,
      status: statusLabel(item.status),
    }));
}

/** Derives the state of the table from the loading flag, an error and the rows. */
export function deriveViewState(
  loading: boolean,
  failed: boolean,
  rows: readonly ItemRow[],
): ItemsViewState {
  if (loading) {
    return 'loading';
  }
  if (failed) {
    return 'error';
  }
  return rows.length === 0 ? 'empty' : 'data';
}
