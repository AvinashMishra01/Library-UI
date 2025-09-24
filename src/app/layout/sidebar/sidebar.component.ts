import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  
constructor(private router:Router){}

  items = [
    {
      routeLink: 'dashboard',
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
      expanded:false,
      subLinks:[]
    },
    {
      routeLink: 'admin/user-management',
      icon: 'fa-solid fa-users',
      label: 'User Mgmt.',
      expanded:false,
      subLinks:[
        {name:'Add User', path:'admin/add-user'},
        {name:"All User", path:'admin/user-management'},
      ]
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
        name: 'Create Library',
        path: 'admin/create-library',
      },
      {
        name: 'Add Plan',
        path: 'admin/add-plan',
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
    this.items=  this.items.map((i)=>{
      if(i.label != item.label){

        i.expanded=false;
      }else{
        i.expanded= !item.expanded
      }
      return i;
    }) ;  
    // item.expanded = !item.expanded;
 
  }


  selectedSubLink:number=-Infinity;
  activeSublink(index:number)
  {
    this.selectedSubLink= index;
  }


}
