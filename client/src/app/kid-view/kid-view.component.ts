import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-kid-view',
  templateUrl: './kid-view.component.html',
  styleUrls: ['./kid-view.component.css']
})
export class KidViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  messageEmergency() {
    console.log('received');
    alert(`Message Received: Emergency Services Called`);
  }
}
