import { InjectionToken } from '@angular/core';

/**
 * Switch for the sample items table on the home page.
 *
 * The sample reads `runtime.customAppItem`, a type that exists only after the sample
 * Construction Kit model (`src/CustomAppCkModel`) is imported into the tenant. A fresh tenant
 * does not have it, so the sample is off by default.
 *
 * To turn it on: import the sample CK model into your tenant, then set this to `true`
 * (README, "Generate the GraphQL types", case "With the sample model").
 * To drop the sample: delete the `src/app/sample/` folder and its use in `pages/home/`.
 */
export const SAMPLE_ITEMS_ENABLED = false;

/** Injection token of {@link SAMPLE_ITEMS_ENABLED}, so tests can switch the sample on and off. */
export const SAMPLE_ITEMS = new InjectionToken<boolean>('Sample items enabled', {
  factory: (): boolean => SAMPLE_ITEMS_ENABLED,
});
