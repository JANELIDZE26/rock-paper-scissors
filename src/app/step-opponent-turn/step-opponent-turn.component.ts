import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../services/communication.service';
import { LocalStorageService } from '../services/local-storage.service';
import { host } from '@angular-devkit/build-angular/src/test-utils';

@Component({
  selector: 'app-step-opponent-turn',
  templateUrl: './step-opponent-turn.component.html',
  styleUrls: ['./step-opponent-turn.component.scss']
})
export class StepOpponentTurnComponent implements OnInit {
  myPick: string | undefined;
  opponentPick: string | undefined;
  pickOptions = ['rock', 'paper', 'scissors'];
  randomPick = Math.floor(Math.random() * 3);
  score = this.cms.score.value;
  lose = false;
  winGame = false;
  showMatchWinMessage = false;
  showDrawMessage = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cms: CommunicationService,
    private router: Router,
    private lss: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.opponentPick = this.lss.get();
    this.myPick = this.activatedRoute.snapshot.params.id;

    console.log(this.opponentPick, this.myPick);

    if (!this.opponentPick) {
      this.opponentPick = this.pickOptions[this.randomPick];
      this.lss.save(this.opponentPick);
    }

    if (this.myPick === this.opponentPick) {
      this.showDrawMessage = true;
      return this.navigate();
    }

    const myPick = this.myPick;
    const oppPick = this.opponentPick;

    if (myPick === 'rock') {
      switch (oppPick) {
        case 'scissors':
          this.onWin();
          break;
        default:
          this.lose = true;
      }
    } else if (myPick === 'paper') {
      switch (oppPick) {
        case 'rock':
          this.onWin();
          break;
        default:
          this.lose = true;
      }
    } else if (myPick === 'scissors') {
      switch (oppPick) {
        case 'paper':
          this.onWin();
          break;
        default:
          this.lose = true;
      }
    }
  }

  onWin(): any {
    this.score += 1;
    this.cms.score.next(this.score);
    this.showMatchWinMessage = true;

    if (this.score === 3) {
      this.winGame = true;
    } else {
      return this.navigate();
    }
  }

  navigate(): void {
    const timeout = this.winGame || this.lose ? 0 : 1500;

    setTimeout(() => {
      this.showMatchWinMessage = false;
      this.showDrawMessage = false;
      this.lss.deleteAll();
      if (this.winGame || this.lose) {
        this.cms.score.next(0);
      }
      this.router.navigate(['/']);
    }, timeout);
  }
}
