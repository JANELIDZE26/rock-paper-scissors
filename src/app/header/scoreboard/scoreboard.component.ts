import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  score = this.cms.score;
  constructor(private cms: CommunicationService) {}

  ngOnInit(): void {}
}
