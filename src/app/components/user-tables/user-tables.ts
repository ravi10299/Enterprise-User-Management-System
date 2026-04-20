import { Component, EventEmitter, input, Output } from '@angular/core';
import { Users } from '../../../interface/user-interfce';

@Component({
  selector: 'app-user-tables',
  imports: [],
  templateUrl: './user-tables.html',
  styleUrl: './user-tables.css',
})
export class UserTables {
  receiceUserData = input<Users[]>();
  serachUserData = input<Users[]>();
  @Output() editUserData = new EventEmitter<Users>();
  @Output() deleteUserById = new EventEmitter<Users>();

  handleOnEdit(users: Users) {
    this.editUserData.emit(users);
  }
  handleOnDelete(users: Users) {
    this.deleteUserById.emit(users);
  }
}
