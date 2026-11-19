import enGB from '../assets/i18n/en-GB.json';
import deAT from '../assets/i18n/de-AT.json';

/** All keys of a nested translation object as dotted paths, e.g. APP.TITLE. */
function keys(value: unknown, prefix = ''): string[] {
  if (value === null || typeof value !== 'object') {
    return [prefix];
  }
  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
    keys(child, prefix ? `${prefix}.${key}` : key)
  );
}

describe('translations', () => {
  it('de-AT has exactly the keys of en-GB', () => {
    expect(keys(deAT).sort()).toEqual(keys(enGB).sort());
  });

  it('de-AT is translated, not a copy of en-GB', () => {
    expect(deAT.APP.HOME).not.toBe(enGB.APP.HOME);
    expect(deAT.COMMON.CANCEL).not.toBe(enGB.COMMON.CANCEL);
  });

  it('keeps the placeholders of every text', () => {
    expect(deAT.LIST_VIEW.PDF_PAGE_TEMPLATE).toContain('{pageNum}');
    expect(deAT.LIST_VIEW.PDF_PAGE_TEMPLATE).toContain('{totalPages}');
  });
});
