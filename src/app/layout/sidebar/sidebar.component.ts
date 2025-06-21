import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  
  items = [
    {
      routeLink: 'dashboard',
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
    },
    {
      routeLink: 'admin',
      icon: 'fa-solid fa-users',
      label: 'User Mgmt.',
    },
    {
      routeLink: 'admin/seat-management',
      icon: 'fa-solid fa-chair',
      label: 'Seat Mgmt.',
    },
    {
      routeLink: 'admin/create-plan',
      icon: 'fa-brands fa-product-hunt',
      label: 'Active Plan',
    },
    {
      routeLink: 'pages',
      icon: 'fa-solid fa-pager',
      label: 'Pages',
    },
    {
      routeLink: 'settings',
      icon: 'fal fa-cog',
      label: 'Settings',
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
