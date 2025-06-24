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
      expanded:false,
      subLinks:[]
    },
    {
      routeLink: 'admin',
      icon: 'fa-solid fa-users',
      label: 'User Mgmt.',
      expanded:false,
       subLinks:[]
    },
    {
      routeLink: 'admin/seat-management',
      icon: 'fa-solid fa-chair',
      label: 'Seat Mgmt.',
      expanded:false,
       subLinks:[]
    },
    {
      routeLink: 'admin/create-plan',
      icon: 'fa-brands fa-product-hunt',
      label: 'Active Plan',
      expanded:false,
       subLinks:[]
    },
    {
      routeLink: 'pages',
      icon: 'fa-solid fa-pager',
      label: 'Pages',
      expanded:false,
       subLinks:[]
    },
    {
      routeLink: 'settings',
      icon: 'fa-solid fa-gear',
      label: 'Settings',
      expanded:false,
       subLinks: [
      {
        name: 'Add Room',
        path: 'admin/room-management',
      },
      {
        name: 'Our Plan',
        path: 'dashboard',
      }
    ]
    },
  ];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
  
  toggleDropdown(item: any) {
    item.expanded = !item.expanded;
  }


  selectedSubLink:number=-Infinity;
  activeSublink(index:number)
  {
    this.selectedSubLink= index;
  }



}
