import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CommandItem,
  CommandSettingsService,
} from '@meshmakers/shared-services';
import { developerBoardIcon, homeIcon } from '../custom-svg-icons';

@Injectable()
export class MyCommandSettingsService extends CommandSettingsService {
  private readonly activatedRoute = inject(ActivatedRoute);

  override get commandItems(): CommandItem[] {
    return [
      {
        id: 'home',
        type: 'link',
        text: 'Home',
        svgIcon: homeIcon,
        link: async (): Promise<string> => '',
      },
      {
        id: 'separator-1',
        type: 'separator',
        text: '',
      },
      {
        id: 'developer-info',
        type: 'link',
        text: 'Developer Info',
        svgIcon: developerBoardIcon,
        link: async (): Promise<string> => 'developer-info',
      },
    ];
  }

  override get navigateRelativeToRoute(): ActivatedRoute {
    return this.activatedRoute.firstChild ?? this.activatedRoute;
  }
}
