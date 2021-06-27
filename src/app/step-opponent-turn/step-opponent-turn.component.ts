import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../services/communication.service';
import { LocalStorageService } from '../services/local-storage.service';
import { host } from '@angular-devkit/build-angular/src/test-utils';

@Component({
  selector: 'app-step-opponent-turn',
  templateUrl: './step-opponent-turn.component.html',
  styleUrls: ['./step-opponent-turn.component.scss'],
})
export class StepOpponentTurnComponent implements OnInit {
  myPick: string | undefined;
  opponentPick: string | undefined;
  pickOptions = ['rock', 'paper', 'scissors'];
  randomPick = Math.floor(Math.random() * 3);
  myScore = this.cms.scores.value.myScore;
  opponentScore = this.cms.scores.value.opponentScore;
  loseGame = false;
  winGame = false;
  showMatchWinMessage = false;
  showMatchLoseMessage = false;
  showDrawMessage = false;
  matchPoint = 2;

  constructor(
    private activatedRoute: ActivatedRoute,
    private cms: CommunicationService,
    private router: Router,
    private lss: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.opponentPick = this.lss.get('opponentPick');
    this.myPick = this.activatedRoute.snapshot.params.id;

    if (!this.opponentPick) {
      this.opponentPick = this.pickOptions[this.randomPick];
      this.lss.save('opponentPick', this.opponentPick);
    } else {
      const scores = this.lss.get('scores');
      const status = this.lss.get('status');

      status === 'won' ? (this.winGame = true) : (this.loseGame = true);
      this.cms.scores.next({ ...scores });
      return;
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
          this.onLose();
      }
    } else if (myPick === 'paper') {
      switch (oppPick) {
        case 'rock':
          this.onWin();
          break;
        default:
          this.onLose();
      }
    } else if (myPick === 'scissors') {
      switch (oppPick) {
        case 'paper':
          this.onWin();
          break;
        default:
          this.onLose();
      }
    }
  }

  onWin(): any {
    this.myScore += 1;
    this.cms.scores.next({
      myScore: this.myScore,
      opponentScore: this.opponentScore,
    });
    this.lss.save('scores', this.cms.scores.value);
    this.showMatchWinMessage = true;

    if (this.myScore >= this.matchPoint) {
      this.winGame = true;
      this.lss.save('status', 'won');
    } else {
      return this.navigate();
    }
  }

  onLose(): any {
    this.opponentScore += 1;
    this.cms.scores.next({
      myScore: this.myScore,
      opponentScore: this.opponentScore,
    });
    this.showMatchLoseMessage = true;
    this.lss.save('scores', this.cms.scores.value);
    if (this.opponentScore >= this.matchPoint) {
      this.loseGame = true;
      this.lss.save('status', 'lost');
    } else {
      return this.navigate();
    }
  }

  navigate(): void {
    const timeout = this.winGame || this.loseGame ? 0 : 1500;

    setTimeout(() => {
      this.showMatchWinMessage = false;
      this.showDrawMessage = false;
      this.showMatchLoseMessage = false;

      this.lss.deleteByKey('opponentPick');
      this.lss.deleteByKey('scores');
      this.lss.deleteByKey('status');

      if (this.winGame || this.loseGame) {
        this.cms.scores.next({
          myScore: 0,
          opponentScore: 0,
        });
      }
      this.router.navigate(['/']);
    }, timeout);
  }
}
