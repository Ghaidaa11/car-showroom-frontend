import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [CommonModule, MatCardContent, MatCardSubtitle, MatCardTitle, MatCard,],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  @Input() title: string = '';
  @Input() subtitle: string | null = '';
}
