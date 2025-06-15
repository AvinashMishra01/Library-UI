import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';




@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {



  bookings = [
  { room: 'Room 101', date: 'Today', duration: '2h' },
  { room: 'Room 202', date: '04/24/2024', duration: '2h' },
  { room: 'Room 105', date: '04/23/2024', duration: '2h' },
  { room: 'Room 105', date: '04/22/2024', duration: '2h' },
  { room: 'Room 303', date: '04/22/2024', duration: '2h' }
];


revenueChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    datasets: [{ data: [200,300,250,280,400,500,620], label:'Revenue' }]
  };
  pieChartData = {
    labels: ['Booked','Per Day','Others'],
    datasets: [{ data: [50,30,20] }]
  };
  doughnutChartData = {
    labels: ['Slot A','Slot B','Slot C'],
    datasets: [{ data: [40,35,25] }]
  };

}
