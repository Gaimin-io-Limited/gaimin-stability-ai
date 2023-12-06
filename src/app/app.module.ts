import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { PromptFormComponent } from './shared/components/prompt-form/prompt-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { PromptResultComponent } from './shared/components/prompt-result/prompt-result.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, PromptFormComponent, PromptResultComponent],
  imports: [HttpClientModule, BrowserModule, ReactiveFormsModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
