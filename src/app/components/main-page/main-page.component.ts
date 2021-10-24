import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {LogService} from '../../services/log.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  building = 1;
  user = '';
  level = '';
  question: any;
  answersList: Array<any> = new Array<any>();
  correctAnswers: number;

  constructor(private service: ApiService, private router: Router, private logger: LogService) {
  }

  ngOnInit(): void {
  }

  showQuestion(): void {
  }

  answerQuestion(i: any): void {

  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
