import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
})
export class RulesComponent implements OnInit {
  showRules = false;
  constructor(private location: Location) {}

  ngOnInit(): void {}

  onBack(): void {
    this.location.back();
  }
}
