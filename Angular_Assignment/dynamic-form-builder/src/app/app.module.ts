import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { ConditionEvaluatorService } from './services/condition-evaluator.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule 
  ],
  providers: [ConditionEvaluatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
