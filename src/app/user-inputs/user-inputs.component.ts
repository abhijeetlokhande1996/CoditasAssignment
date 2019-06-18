import { Users } from './../models/users.model';
import { debounceTime, distinctUntilChanged, map, switchMap, catchError } from 'rxjs/operators';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GetUsersFromGithubService } from '../services/get-users-from-github.service';
import { UsersService } from '../services/users.service';
import { throwError, of, empty } from 'rxjs';



@Component({
  selector: 'app-user-inputs',
  templateUrl: './user-inputs.component.html',
  styleUrls: ['./user-inputs.component.css']
})
export class UserInputsComponent implements OnInit {


  userInputForm: FormGroup;
  sortOptions: Array<string>;
  sortOrder: number = null;
  isLoading: boolean;
  isError: boolean;
  errMsg: string = null;
  @Output() isLoadingEvent: EventEmitter<boolean>  = new EventEmitter();
  constructor(private githubService: GetUsersFromGithubService,
    private userService: UsersService) { }

  ngOnInit() {
    this.isLoading = false;
    this.isError = false;
    this.sortOptions = ['Name(A-Z)', 'Name(Z-A)', `Rank ${String.fromCharCode(8593)}`, `Rank ${String.fromCharCode(8595)}`];
    this.userInputForm = new FormGroup({
      sortBy: new FormControl(1, [Validators.required]),
      searchString: new FormControl(null, [Validators.required])
    });

    this.userInputForm.valueChanges
    .pipe(debounceTime(1000), distinctUntilChanged(), switchMap((values) => {
      this.sortOrder = values.sortBy;
      this.isLoading = true;
      this.isLoadingEvent.emit(this.isLoading);
      if (!values.searchString){
        console.log('Search String Empty');
        this.isLoading = false;
        this.isError = true;
        this.errMsg = 'Search string is empty';
        return empty();
      }
      return this.githubService.getGithubUsers(values.searchString).pipe(catchError(err => {
        this.isLoading = false;
        this.errMsg = 'Check your internet connection';
        return empty();
      } ));
    }), map((resp) => {
      const items: Array<any> = resp.items;
      switch (this.sortOrder) {
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

      return resp;
    })).subscribe((resp) => {
      const users: Users = resp;
      users.items.forEach(user => {
          fetch(user.avatar_url).then((imgResp) => {
            imgResp.arrayBuffer().then(buffer => {
              const imgInStr = 'data:image/jpeg;base64,' + this.arrayBufferToBase64(buffer);
              user.avatar = imgInStr;
            });
          });
      });
      this.isLoading = false;
      this.isError = false;
      this.isLoadingEvent.emit(this.isLoading);
      this.userService.setUsers(users);
    }, err => {
      this.isLoading = false;
      this.isError = true;
      this.isLoadingEvent.emit(this.isLoading);
      this.errMsg = 'Something went wrong';
      console.error(err);
    });


  }
   arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    bytes.forEach((b) => binary += String.fromCharCode(b));

    return window.btoa(binary);
  };

}
