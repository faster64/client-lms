import { NgModule } from "@angular/core";
import { CountDownPipe } from "./count-down.pipe";
import { DateTimeVietnamPipe } from "./date-time.pipe";
import { DateVietnamPipe } from "./date.pipe";
import { NumberFormatPipe } from "./number-format.pipe";
import { TimePipe } from "./time.pipe";

@NgModule({
  declarations: [
    CountDownPipe,
    DateTimeVietnamPipe,
    DateVietnamPipe,
    NumberFormatPipe,
    TimePipe
  ],
  imports: [
  ],
  exports: [
    CountDownPipe,
    DateTimeVietnamPipe,
    DateVietnamPipe,
    NumberFormatPipe,
    TimePipe
  ]
})
export class PipesModule { }
