import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { UserActions } from './store/actions/user.action';
import { UserStateModel } from './store/states/user.state';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @Select((state: { user: UserStateModel }) => state.user.loggedInUser)
  loggedInUser$!: Observable<User>;
  loggedInUserVal!: User;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.loggedInUser$.subscribe((user) => {
      this.loggedInUserVal = user;
      console.log(`latest logged in user val: `, this.loggedInUserVal);
    });
  }

  login() {
    this.store.dispatch(
      new UserActions.RegisterLoggedInUser({
        username: 'test',
        email: 'test@test.com',
      })
    );
  }
}
