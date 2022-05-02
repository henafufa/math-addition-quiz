import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  success = "Well Done! Your Answer is Correct!";
  tryAgain = "Your Answer is Incorrect. Try Again";
  answer = "You Didn't Get it Right. The Answer is: ";

  constructor(private additionService: AdditionService, private router: Router) { }
  @ViewChild('container')
  container!: ElementRef;

  ngOnInit(): void {
    this.getQuestions();
    this.timeCounter(this.givenTime);
  }

  // Getting all questions
  getQuestions = () => {
    this.additionService.getQuestions().subscribe(
      (res: any) => {
        this.question_data = res;
      },
      (error) => {
        console.log(`Error:${error}`);
      }
    );
  }

  // Set time to count
  timeCounter = (time: any) => {
    let input: any = document.getElementById('input');
    this.counter = setInterval(() => {
      this.timer = time;
      time--;
      if (this.timer == 0) {
        time = 0;
        input.disabled = true;
        this.container.nativeElement.innerHTML = ` <div class="alert alert-info alert-dismissible d-flex" role="alert">
        <div class="alert-message ">
            <span id="message">${this.answer}${this.question_data[this.index].number1 + this.question_data[this.index].number2}</span>
        </div>
    </div>
  `;
      }
    }, 1000)
  }

  // Call the next question
  getNextQuestion = () => {
    let input: any = document.getElementById('input');
    input.disabled = false;
    input.value = '';
    this.container.nativeElement.innerHTML = "";
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
    }
  }

  // Listen to input 
  onEnter = (answer: string) => {
    let input: any = document.getElementById('input');
    let correctAnswer = (this.question_data[this.index].number1 + this.question_data[this.index].number2).toString();
    if (answer == correctAnswer) {
      this.container.nativeElement.innerHTML = ` <div class="alert alert-info alert-dismissible d-flex" role="alert">
                <div class="alert-message ">
                    <span id="message">${this.success}</span>
                </div>
                <div class="icon"><i class="fas fa-check"></i></div>
            </div>
      `;
      this.totalAnswered++;
      input.disabled = true;
      setTimeout(() => {
        this.getNextQuestion();
      }, 2000);
    }

    else {
      this.container.nativeElement.innerHTML = ` <div class="alert alert-danger alert-dismissible d-flex" role="alert">
              <div class="alert-message ">
                  <span id="message">${this.tryAgain}</span>
              </div>
              <div class="icon"><i class="fas fa-times"></i></div>
          </div>
        `;
    }
  }

  //Take the test again
  Retest = () => {
    let element: any = document.getElementById('gameContainer');
    element.style.display = 'block';
    this.done = false;
    this.index = 0;
    this.questionTotal = 0;
    this.totalAnswered = 0;
    this.getNextQuestion();
  }
}