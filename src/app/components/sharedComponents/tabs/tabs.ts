import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, MatTabsModule, NgTemplateOutlet],
  template: `
    <mat-tab-group [selectedIndex]="selectedIndex">
      <mat-tab *ngFor="let tab of tabs; index as i" [label]="tab">
        <ng-container *ngTemplateOutlet="tabTemplates[i]"></ng-container>
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrl: './tabs.css'
})
export class Tabs {

  @Input() tabs: string[] = []; 
  @Input() selectedIndex = 0;   
  @Input() tabTemplates: any[] = []; 
  
}
