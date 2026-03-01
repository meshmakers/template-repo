import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import {
  BreadCrumbService,
  CommandService,
  ComponentMenuService,
} from '@meshmakers/shared-services';
import { LoginAppBarSectionComponent } from '@meshmakers/shared-auth/login-ui';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { SVGIconModule } from '@progress/kendo-angular-icons';
import {
  DrawerItem,
  DrawerModule,
  DrawerSelectEvent,
} from '@progress/kendo-angular-layout';
import { MenuModule } from '@progress/kendo-angular-menu';
import { MenuItem } from '@progress/kendo-angular-menu';
import {
  AppBarModule,
  BreadCrumbItem,
  BreadCrumbModule,
} from '@progress/kendo-angular-navigation';
import { VERSION } from '../environments/currentVersion';
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
    LoginAppBarSectionComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  private readonly commandService = inject(CommandService);
  private readonly breadCrumbService = inject(BreadCrumbService);
  private readonly componentMenuService = inject(ComponentMenuService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  readonly themeService = inject(ThemeService);

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
