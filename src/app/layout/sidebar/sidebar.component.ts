import { CommonModule } from '@angular/common';
import { Component, input, OnInit, output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

interface Sidebar {
 routeLink: string,
      icon: string,
      label: string,
      expanded:boolean,
      subLinks:Sublink[]
}[]

interface Sublink {
  name:string,
  path:string
}[]
@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
 isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  
constructor(private router:Router){}

mainSidebar:Sidebar[]=[]
  adminSidebar: Sidebar[] = [
    {
      routeLink: 'dashboard',
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
      expanded:false,
      subLinks:[]
    },
    {
      routeLink: 'user-management',
      icon: 'fa-solid fa-users',
      label: 'User Mgmt.',
      expanded:false,
      subLinks:[
        {name:'Add User', path:'add-user'},
        {name:"All User", path:'user-management'},
      ]
    },
    {
      routeLink: 'seat-management',
      icon: 'fa-solid fa-chair',
      label: 'Seat Mgmt.',
      expanded:false,
       subLinks:[]
    },
    {
      routeLink: 'create-plan',
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
        path: 'create-library',
      },
      {
        name: 'Add Plan',
        path: 'add-plan',
      }
    ]
    },
  ];

  userSidebar:Sidebar[]=[
    {
      routeLink: 'dashboard',
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
      expanded:false,
      subLinks:[]
    },
    {
      routeLink: 'change-library',
      icon: 'fa-solid fa-subscript',
      label: 'Change Library',
      expanded:false,
      subLinks:[]
    }
  ]


ngOnInit() {
  
  let role = localStorage.getItem('role')
   if(role=='admin')
   {
    this.mainSidebar= this.adminSidebar
   }else{
    this.mainSidebar= this.userSidebar
   }

}

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
  
  toggleDropdown(item: any) {
    this.mainSidebar=  this.mainSidebar.map((i)=>{
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
