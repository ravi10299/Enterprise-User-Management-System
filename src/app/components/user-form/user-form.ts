import { Component, computed, EventEmitter, input, Output, output, signal } from '@angular/core';
import { Users } from '../../../interface/user-interfce';
import { UserService } from '../../service/user-service';
import { UserTables } from '../user-tables/user-tables';

@Component({
  selector: 'app-user-form',
  imports: [UserTables],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  userData = signal<Users[]>([]);
  name = signal<string>('');
  city = signal<string>('');
  age = signal<number>(0);
  isActive = signal<boolean>(false);
  exitUserId = signal<number | null>(null);

  searchUserName = input<string>('');

  // seraching logic.....using computed.....
  filteredUser = computed(() => {
    const search = this.searchUserName()?.trim().toLowerCase() || '';

    console.log(this.searchUserName());
    console.log('Search Text:', search); // सर्च टेक्स्ट लॉग करें

    const filtered = this.userData().filter(
      (user) =>
        user.name.toLowerCase().includes(search) ||
        user.city.toLowerCase().includes(search) ||
        user.age.toString().includes(search),
    );

    console.log('Filtered Users:', filtered); // फिल्टर किए गए यूज़र लॉग करें

    return filtered;
  });
  constructor(private userService: UserService) {}

  //get user
  ngOnInit() {
    this.loadUsers();
  }

  // load user
  loadUsers() {
    this.userService.getUser().subscribe((data) => {
      this.userData.set(data);
    });
  }

  //edit user...

  handelOnEditUser(users: Users) {
    this.exitUserId.set(users.id!);
    this.name.set(users.name);
    this.age.set(users.age);
    this.city.set(users.city);
    this.isActive.set(users.isActive);
  }

  handleOnSubmitForm() {
    const payload = {
      name: this.name(),
      age: this.age(),
      city: this.city(),
      isActive: this.isActive(),
    };
    console.log(payload);
    //edit user...
    if (this.exitUserId() !== null) {
      this.userService.putUser(this.exitUserId()!, payload).subscribe(() => {
        this.loadUsers();
        this.name.set('');
        this.city.set('');
        this.age.set(0);
        this.isActive.set(false);
        this.exitUserId.set(null);
      });
    } else {
      //post user....
      this.userService.postUser(payload).subscribe(() => {
        this.loadUsers();
        this.name.set('');
        this.city.set('');
        this.age.set(0);
        this.isActive.set(false);
        this.exitUserId.set(null);
      });
    }
  }

  handleOnStatus(users: Users) {
    this.userService.patchUser(users.id!, !users.isActive).subscribe(() => {
      this.userData.update((list) =>
        list.map((u) => (u.id === users.id ? { ...u, isActive: !u.isActive } : u)),
      );
    });
  }

  handleOnDelete(users: Users) {
    const confirmToDelete = confirm('this user to deleted :' + users.name);
    if (confirmToDelete) {
      this.userService.deleteUser(users.id!).subscribe(() => {
        this.userData.update((list) => list.filter((u) => u.id !== users.id));
      });
    }
  }
}
