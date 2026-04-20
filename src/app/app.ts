import { Component, signal } from '@angular/core';
import { Header } from './components/header/header';
import { UserForm } from './components/user-form/user-form';
import { UserTables } from './components/user-tables/user-tables';

@Component({
  selector: 'app-root',
  imports: [Header, UserForm],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  searchUserName = signal<string>('');

  handleOnSerach(name: string) {
    this.searchUserName.set(name);
    // console.log(this.searchUserName());
  }
}
