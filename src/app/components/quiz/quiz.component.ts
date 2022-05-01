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
  question_data_1!: QUESTION;
  counter: any | undefined;
  timer: number | undefined
  index: number = 0;
  questionTotal = 1;
  userAnswer = '';
  correctAnswer = '';
  totalAnswered = 0;
  questionAnswered = false;
  messageShow: boolean = false;
  givenTime = 9;
  done: boolean = false;

  constructor(private additionService: AdditionService, private router: Router) { }

  ngOnInit(): void {

    this.additionService.getQuestion().subscribe(
      (res: any) => {
        this.question_data = res;
        this.question_data_1 = res[0];
      },
      (error) => {
        console.log(`Error:${error}`);
      }
    );

    this.timeCounter(this.givenTime);
  }

  timeCounter = (time: any) => {
    this.counter = setInterval(() => {
      this.timer = time;
      time--;
      if (this.timer == 0) {
        this.getNextQuestion();
      }
    }, 1000)
  }

  getNextQuestion = () => {
    this.messageShow = false;
    clearInterval(this.counter);
    this.timeCounter(this.givenTime);
    if (this.index < this.question_data.length - 1) {
      this.index++;
      this.question_data_1 = this.question_data[this.index];
      this.questionTotal++;
    }
    else {
      clearInterval(this.counter);
      this.done = true;
      // this.router.navigate(['/quiz/result']);
      console.log("Question completed");
    }
  }

  onEnter = (answer: string) => {
    let message: any = document.getElementById('message');
    this.messageShow = true;
    this.userAnswer = answer;
    this.correctAnswer = (this.question_data_1.number1 + this.question_data_1.number2).toString();
    if (this.userAnswer == this.correctAnswer) {
      this.correctAnswer = this.userAnswer;
      this.questionAnswered = true;
      this.totalAnswered++;
      message.innerHTML = "Well Done! Your Answer is Correct";
      this.getNextQuestion();
    }
    else {
      this.questionAnswered = false;
      if (!(this.timer == 2)) {
        message.innerHTML = "Your Answer is Incorrect. Try Again";
      }
      else {
        message.innerHTML = "Your Answer is Incorrect. The Answer is: " + this.correctAnswer;
      }
    }

  }

  // getAnswer = (answer: any) => {
  //   let element: any = document.getElementById('choicesId');
  //   let wrong: any = document.getElementsByClassName('icon');
  //   let userAnswer = answer;
  //   console.log(`user input: ${userAnswer}`);
  //   if (userAnswer === 7) {
  //     this.answered = true;
  //     element.classList.add("correct");
  //     this.correctAnswers++;
  //     console.log("Answer is correct:");
  //   }
  //   else {
  //     this.answered = false;
  //     element.classList.add("incorrect");
  //     console.log("Answer is not correct:");

  //   }
  // }
}
