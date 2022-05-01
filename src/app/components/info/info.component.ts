import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  @ViewChild("quiz__container") startButton: ElementRef | undefined;
  public show: boolean = true;

  constructor(public router: Router) { }
  ngOnInit() { }

  startGame() {
    this.show = !this.show;
  }

  ExitGame() {
    this.show = !this.show;
  }
  continueGame() {
    this.router.navigate(['/quiz']);

  }
}
