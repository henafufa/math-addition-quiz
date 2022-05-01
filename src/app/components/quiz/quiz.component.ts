import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdditionService } from 'src/app/services/addition.service';
import { QUESTION } from '../../models/question';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  question_data!: QUESTION[];
  counter: any | undefined;
  timer = 0;
  index: number = 0;
  questionTotal = 1;
  totalAnswered = 0;
  givenTime = 8;
  done: boolean = false;

  constructor(private additionService: AdditionService, private router: Router) { }

  ngOnInit(): void {

    this.getQuestions();
    this.timeCounter(this.givenTime);
  }

  // Getting all questions
  getQuestions = () => {
    this.additionService.getQuestions().subscribe(
      (res: any) => {
        this.question_data = res;
        console.log('res:', res);
      },
      (error) => {
        console.log(`Error:${error}`);
      }
    );
  }

  // set time count time
  timeCounter = (time: any) => {
    this.counter = setInterval(() => {
      this.timer = time;
      time--;
      if (this.timer == 0) {
        this.getNextQuestion();
      }
    }, 1000)
  }

  // Call the next question
  getNextQuestion = () => {
    clearInterval(this.counter);
    this.timeCounter(this.givenTime);
    if (this.index < this.question_data.length - 1) {
      this.index++;
      this.questionTotal++;
    }
    else {
      clearInterval(this.counter);
      this.done = true;
      let element: any = document.getElementById('gameContainer');
      element.style.display = 'none';
      console.log("Question completed");
    }
  }

  onEnter = (answer: string) => {
    let correctAnswer = (this.question_data[this.index].number1 + this.question_data[this.index].number2).toString();
    console.log(`user answer: ${answer} correct answer: ${correctAnswer}`);
    if (answer == correctAnswer) {
      this.totalAnswered++;
      this.getNextQuestion();
    }
    else {
      

    }

  }

  Retest = () => {
    let element: any = document.getElementById('gameContainer');
    element.style.display = 'block';
    this.done = false;
    this.index = 0;
    this.getNextQuestion();
  }
}