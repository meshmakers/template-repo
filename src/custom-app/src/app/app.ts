import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { LoginAppBarSectionComponent } from '@meshmakers/shared-auth/login-ui';
import {
  BreadCrumbService,
  CommandService,
  ComponentMenuService,
} from '@meshmakers/shared-services';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import {
  DrawerItem,
  DrawerModule,
  DrawerSelectEvent,
} from '@progress/kendo-angular-layout';
import { MenuItem, MenuModule } from '@progress/kendo-angular-menu';
import {
  AppBarModule,
  BreadCrumbItem,
  BreadCrumbModule,
} from '@progress/kendo-angular-navigation';
import { menuIcon, type SVGIcon } from '@progress/kendo-svg-icons';
import { VERSION } from '../environments/currentVersion';
import { MaintenanceModeComponent } from './components/maintenance-mode/maintenance-mode';
import { MaintenanceModeService } from './services/maintenance-mode.service';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    AppBarModule,
    DrawerModule,
    BreadCrumbModule,
    MenuModule,
    ButtonModule,
    SVGIconModule,
    DialogModule,
    LoginAppBarSectionComponent,
    MaintenanceModeComponent,
  ],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.scss',
})
export class AppComponent {
  private readonly commandService = inject(CommandService);
  private readonly breadCrumbService = inject(BreadCrumbService);
  private readonly componentMenuService = inject(ComponentMenuService);
  private readonly maintenanceModeService = inject(MaintenanceModeService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly themeService = inject(ThemeService);

  readonly menuIcon = menuIcon;
  readonly lightModeIcon: SVGIcon = {
    name: 'light-mode',
    content:
      '<path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" />',
    viewBox: '0 0 24 24',
  };
  readonly darkModeIcon: SVGIcon = {
    name: 'dark-mode',
    content:
      '<path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z" />',
    viewBox: '0 0 24 24',
  };
  readonly maintenanceMode$ = this.maintenanceModeService.maintenanceMode$;
  readonly version = VERSION.version;
  readonly expanded = signal(true);
  readonly drawerItems$ = this.commandService.drawerItems;
  readonly breadCrumbItems$ = this.breadCrumbService.breadCrumbItems;
  readonly menuItems$ = this.componentMenuService.menuItems;

  private expandedIndices = new Set<number>();

  toggleDrawer(): void {
    this.expanded.update((v) => !v);
  }

  onDrawerSelect(event: DrawerSelectEvent): void {
    this.commandService.setSelectedDrawerItem(event.item as DrawerItem);
  }

  onBreadCrumbItemClick(item: BreadCrumbItem): void {
    const url = (item as { url?: string }).url;
    if (url) {
      const firstChild = this.activatedRoute.firstChild;
      if (firstChild) {
        this.router.navigate([url], {
          relativeTo: firstChild,
        });
      }
    }
  }

  onMenuSelect(item: MenuItem): void {
    this.componentMenuService.setSelectedMenuItem(item);
  }

  isItemExpanded: (item: DrawerItem) => boolean = (
    item: DrawerItem
  ): boolean => {
    const index = item['id'] as number;
    return this.expandedIndices.has(index);
  };
}
