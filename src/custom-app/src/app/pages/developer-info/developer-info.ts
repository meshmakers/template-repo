import { Component, OnInit, inject, signal } from '@angular/core';
import {
  DevelopmentInfo,
  DiagnosticsService,
} from '../../services/diagnostics.service';

@Component({
  selector: 'app-developer-info',
  standalone: true,
  templateUrl: './developer-info.html',
  styleUrl: './developer-info.scss',
})
export class DeveloperInfoComponent implements OnInit {
  private readonly diagnosticsService = inject(DiagnosticsService);

  readonly info = signal<DevelopmentInfo | null>(null);

  ngOnInit(): void {
    this.info.set(this.diagnosticsService.getDevelopmentInfo());
  }
}
