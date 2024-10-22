import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from "@angular/forms";


@Component({
  imports: [FormsModule, ReactiveFormsModule],

  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  standalone: true,
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  currentNumber: string = '0';
  previousNumber: string = '';
  operation: string = '';
  isNewNumber: boolean = false;


  appendNumber(target: any): void {
    const value = target.innerText;


    if (this.currentNumber === '0' || this.isNewNumber) {
      this.currentNumber = value === '.' ? '0.' : value;
      this.isNewNumber = false;
    } else {
      if (!(value === '.' && this.currentNumber.includes('.'))) {
        this.currentNumber += value;
      }
    }
  }


  set_Operation(target: any): void {
    const operation = target.innerText;
    if (this.previousNumber && this.currentNumber && this.operation) {
      this.calculateResult();
    }
    this.operation = operation;
    this.previousNumber = this.currentNumber;
    this.isNewNumber = true;
  }


  calculateResult(): void {
    let result: number;

    const prev = parseFloat(this.previousNumber);
    const current = parseFloat(this.currentNumber);

    switch (this.operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = current !== 0 ? prev / current : 0;
        break;
      default:
        return;
    }

    this.currentNumber = result.toString();
    this.operation = '';
    this.previousNumber = '';
    this.isNewNumber = true;
  }


  deleteLast(): void {
    this.currentNumber = this.currentNumber.slice(0, -1) || '0';
  }


  reset(): void {
    this.currentNumber = '0';
    this.previousNumber = '';
    this.operation = '';
    this.isNewNumber = false;
  }
}
