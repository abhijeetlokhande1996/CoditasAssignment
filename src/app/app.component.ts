import { UserDetails, Users } from './models/users.model';
import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CoditasAssignment';
  showUserdetailsComponent = true;
  userdetails: Users;
  totalRecords: number;
  selectedPage = 0;
  startIdx = 0;
  endIdx = 5;
  constructor(private userService: UsersService) { }
  ngOnInit(): void {
      this.userService.getUsers().subscribe(resp => {
          if (resp) {
            this.userdetails = resp;
            this.totalRecords = this.userdetails.items.length;
            console.log(this.userdetails.items, this.totalRecords);
          }
      });
  }
  isLoadingEventCapture = (event: boolean) => {
    this.showUserdetailsComponent = event;
  }
  sortByEventCapture = (sortBy: number) => {

    const items: Array<UserDetails> = this.userdetails.items;
    items.forEach((element) => {
      element.detailsButtonFlag = true;
    });
    switch (sortBy) {
      case 1:
        // ascending sort by names
        items.sort((firstUser, secondUser) => {
          if (firstUser.login > secondUser.login) {
            return 1;
          } else if (firstUser.login < secondUser.login) {
            return -1;
          } else {
            return 0;
          }
        });
        break;
      case 2:
        // descending sort by names
        items.sort((firstUser, secondUser) => {
          if (firstUser.login > secondUser.login) {
            return -1;
          } else if (firstUser.login < secondUser.login) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
      case 3:
        // ascending sort by rank
        items.sort((firstUser, secondUser) => {
          if (firstUser.score > secondUser.score) {
            return 1;
          } else if (firstUser.score < secondUser.score) {
            return -1;
          } else {
            return 0;
          }
        });

        break;
      case 4:
        // descending sort by rank
        items.sort((firstUser, secondUser) => {
          if (firstUser.score > secondUser.score) {
            return -1;
          } else if (firstUser.score < secondUser.score) {
            return 1;
          } else {
            return 0;
          }
        });
        break;
    }

  }
  onClickPage = (pageIdx) => {
    this.selectedPage = pageIdx;
      this.startIdx = pageIdx * 5;
      this.endIdx = pageIdx * 5 + 5;
    /* if (Math.round(this.totalRecords / 5) === pageIdx + 1) {

        this.selectedPage = pageIdx;
        this.startIdx = pageIdx * 5;
        this.endIdx = this.totalRecords;
    } else {
      this.selectedPage = pageIdx;
      this.startIdx = pageIdx * 5;
      this.endIdx = pageIdx * 5 + 5;
    } */

  }
}
