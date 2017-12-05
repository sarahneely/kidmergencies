import { Component, OnInit } from '@angular/core';
import { AddContactsComponent } from '../add-contacts/add-contacts.component';
import { HouseholdInfoComponent } from '../household-info/household-info.component';
import { RouterModule, Routes } from '@angular/router';
import { SettingsNavComponent } from '../settings-nav/settings-nav.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
