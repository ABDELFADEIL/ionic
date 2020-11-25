import { Component, OnInit } from '@angular/core';
import {Question} from "../models/question";
import {QuestionService} from "../services/question.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  score: number;
  respose: boolean;
  live: number = 3;
  questions: Question [] = [];

  constructor(private questionService: QuestionService) {
  }

  ngOnInit() {
    this.getQuestion();
  }

  getQuestion(){
    this.questionService.getQuestions().subscribe(res => {
      this.questions = res;
      console.log(res);
    });
  }

  getArray(n: number): any[] {
    return Array(n);
  }




}
