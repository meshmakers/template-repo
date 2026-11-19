import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { GridModule } from '@progress/kendo-angular-grid';
import { TranslatePipe } from '@ngx-translate/core';
import { ItemRow, deriveViewState } from '../../sample/items';
import { ItemsService } from '../../sample/items.service';
import { SAMPLE_ITEMS } from '../../sample/sample-items.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonsModule, GridModule, TranslatePipe],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  private readonly itemsService = inject(ItemsService);

  /** The sample items table stays off until the sample CK model is imported (sample-items.config.ts). */
  readonly sampleEnabled = inject(SAMPLE_ITEMS);

  readonly rows = signal<ItemRow[]>([]);
  readonly loading = signal(false);
  readonly failed = signal(false);
  readonly state = computed(() =>
    deriveViewState(this.loading(), this.failed(), this.rows()),
  );

  ngOnInit(): void {
    if (this.sampleEnabled) {
      this.load();
    }
  }

  /** Loads the items; also used by the retry button of the error state. */
  load(): void {
    this.loading.set(true);
    this.failed.set(false);
    this.itemsService.loadItems().subscribe({
      next: (rows) => {
        this.rows.set(rows);
        this.loading.set(false);
      },
      error: () => {
        this.rows.set([]);
        this.failed.set(true);
        this.loading.set(false);
      },
    });
  }
}
