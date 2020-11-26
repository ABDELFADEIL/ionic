import { Component, OnInit } from '@angular/core';
import {Question} from "../models/question";
import {QuestionService} from "../services/question.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  score: number = 0;
  respose: boolean;
  live: number = 3;
  gameOver: boolean = false;
  //replay: boolean;
  isCorrect: boolean;
  questionIndex: number = 0;
  questions: Question [] | null;
  answered: boolean = false;


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

  replay(){
    this.getQuestion();
    this.score = 0;
    this.live = 3;
    this.answered = false;
    this.gameOver = false;
    this.questionIndex = 0;
  }

  toNextQuestion() {
    this.questionIndex++;
    this.respose = false;
    this.answered = false;
  }

  Answer(answer: boolean) {
   console.log(answer);
   this.answered = true;
   let response: boolean = this.questions[this.questionIndex].correct;
   if(answer == response){
     this.score++;
     this.isCorrect = true;
   } else {
     this.isCorrect = false;
     this.live--;
   }
   if (this.questionIndex >= this.questions.length-1 || this.live == 0) {
     this.gameOver = true
   }
  }
}
