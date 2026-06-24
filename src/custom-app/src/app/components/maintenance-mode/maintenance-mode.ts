import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { SVGIconComponent } from '@progress/kendo-angular-icons';
import { wrenchIcon } from '@progress/kendo-svg-icons';

@Component({
  selector: 'app-maintenance-mode',
  standalone: true,
  imports: [TranslatePipe, SVGIconComponent],
  template: `
    <div class="maintenance-container">
      <div class="maintenance-card">
        <div class="maintenance-icon">
          <kendo-svgicon [icon]="wrenchIcon" size="xxxlarge"></kendo-svgicon>
        </div>
        <h1 class="maintenance-title">{{ 'MAINTENANCE.TITLE' | translate }}</h1>
        <p class="maintenance-message">
          {{ 'MAINTENANCE.MESSAGE' | translate }}
        </p>
        <p class="maintenance-submessage">
          {{ 'MAINTENANCE.SUBMESSAGE' | translate }}
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      :host {
        display: block;
      }

      .maintenance-container {
        position: fixed;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, #3f51b5 0%, #303f9f 100%);
        z-index: 10000;
      }

      .maintenance-card {
        width: 500px;
        max-width: 90vw;
        padding: 2rem;
        text-align: center;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
      }

      .maintenance-icon {
        margin-bottom: 1.5rem;
        color: #3f51b5;
      }

      .maintenance-title {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .maintenance-message {
        font-size: 1.1rem;
        color: #666;
        margin-bottom: 0.5rem;
      }

      .maintenance-submessage {
        font-size: 0.95rem;
        color: #999;
      }
    `,
  ],
})
export class MaintenanceModeComponent {
  protected readonly wrenchIcon = wrenchIcon;
}
