import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreatePrompt, Prompt, ServerResponse, StatusPrompt } from '../interfaces';
import { Observable } from 'rxjs';
import { PROMPT_STATUSES } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly API_KEY: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJleGFtcGxlQGVtYWlsLmNvbSIsImlhdCI6MTY5OTg3MDk4NH0.3xO0rZ4opUbd5dUZCvC2EtKc1ydgibfMrRvpcukJUnc';
  private readonly STATUS_CHECKER_TIME: number = 1000 * 5;
  private statusInterval: ReturnType<typeof setInterval> | undefined;

  promptId: string = '';
  promptData: StatusPrompt | undefined;

  private get authorizationHeader(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        Authorization: this.API_KEY
      })
    };
  }

  constructor(private http: HttpClient) {}

  createPromptRequest(prompt: Prompt): Observable<ServerResponse<CreatePrompt>> {
    return this.http.post<ServerResponse<CreatePrompt>>(
      `${environment.customerAPI}/prompts`,
      prompt,
      this.authorizationHeader
    );
  }

  turnOnStatusChecker() {
    this.turnOffStatusChecker();
    this.statusInterval = setInterval(() => {
      this.getPromptStatusRequest(this.promptId).subscribe({
        next: (statusResponse) => {
          if (statusResponse.success) {
            this.promptData = statusResponse.data;
            if(statusResponse.data.status === PROMPT_STATUSES.COMPLETED) {
              this.turnOffStatusChecker();
            }
          }
        }
      });
    }, this.STATUS_CHECKER_TIME);
  }

  turnOffStatusChecker() {
    clearInterval(this.statusInterval);
  }

  private getPromptStatusRequest(promptId: string): Observable<ServerResponse<StatusPrompt>> {
    return this.http.get<ServerResponse<StatusPrompt>>(
      `${environment.customerAPI}/prompts/${promptId}/status`,
      this.authorizationHeader
    );
  }
}
