import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  score = new BehaviorSubject<number>(0);
  scores = new BehaviorSubject<{
    myScore: number;
    opponentScore: number;
  }>({
    myScore: 0,
    opponentScore: 0,
  });

  constructor() {}
}
