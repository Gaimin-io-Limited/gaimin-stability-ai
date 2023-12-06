import { Component } from '@angular/core';
import { PROMPT_STATUSES } from '../../enums';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-prompt-result',
  templateUrl: './prompt-result.component.html',
  styleUrl: './prompt-result.component.scss'
})
export class PromptResultComponent {
  protected readonly PROMPT_STATUSES = PROMPT_STATUSES;

  constructor(public customerService: CustomerService) {}
}
