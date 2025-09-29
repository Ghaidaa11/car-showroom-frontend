import { Component, OnInit } from '@angular/core';
import { Showroom } from '../../../services/showroom';
import { ListShowroomResponse, ShowroomResponse } from '../../../models/showroom.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Card } from '../../sharedComponents/card/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-showroom-details',
  imports: [CommonModule, Card, MatIconModule],
  templateUrl: './showroom-details.html',
  styleUrl: './showroom-details.css'
})
export class ShowroomDetails implements OnInit {

  showroom: ShowroomResponse | null = null

  constructor(private showroomService: Showroom,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    if (id) {
      this.fetchData(id);
    } else {
      console.error('No ID in query params');
    }
  }

  fetchData(id: number) {
    this.showroomService.getShowroom(id).subscribe({
      next: (res) => {
        this.showroom = res
      },
      error: (err) => {
        console.log('Failed to fetch the data', err)
      }
    })
  }

  edit(row: ListShowroomResponse) {
      this.router.navigate(['/showrooms/update'], {
      queryParams: { id: row.id }
      });
  }


}
