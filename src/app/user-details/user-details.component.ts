import { Users, UserDetails } from './../models/users.model';
import { UsersService } from './../services/users.service';
import { Component, OnInit, Input } from '@angular/core';
import { GetUsersFromGithubService } from '../services/get-users-from-github.service';
import { Repo } from '../models/repo.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  totalRecords: number;
  buttonName = 'Details';
  repos: Array<Repo>;
  reposLen: number;
  startIdxForRepo = 0;
  endIdxForRepo = 5;
  itemsPerPage = 5;
  selectedPage = 0;
  isRepoLoading = false;
  @Input()userdetail: UserDetails;
  constructor(
    private githubService: GetUsersFromGithubService) { }

  ngOnInit() {}
  onClickDetailsCollapseButton = (user: UserDetails) => {
    if (user.detailsButtonFlag) {
      user.isRepoLoading = true;
      this.githubService.getAllRepoOfUser(user.login).subscribe((resp) => {
        user.repos = resp;
        this.reposLen = user.repos.length;
        // console.log(this.reposLen);
        user.isRepoLoading = false;
        user.detailsButtonFlag = !user.detailsButtonFlag;
      });
    } else {
      user.detailsButtonFlag = !user.detailsButtonFlag;
    }


  }
  onClickPage = (pageIdx) => {
    if (Math.round(this.reposLen / 5) === pageIdx + 1) {

        this.selectedPage = pageIdx;
        this.startIdxForRepo = pageIdx * 5;
        this.endIdxForRepo = this.reposLen;
    } else {
      this.selectedPage = pageIdx;
      this.startIdxForRepo = pageIdx * 5;
      this.endIdxForRepo = pageIdx * 5 + 5;
    }

  }

}
