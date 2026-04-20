import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  searchUser = signal<string>('');
  @Output() sendSerachDataToFrom = new EventEmitter<string>();

  handleOnSearch() {
    this.sendSerachDataToFrom.emit(this.searchUser());
    this.searchUser.set('');
  }
}
