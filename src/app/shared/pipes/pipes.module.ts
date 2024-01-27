import { NgModule } from "@angular/core";
import { CountDownPipe } from "./count-down.pipe";
import { DateTimeVietnamPipe } from "./date-time.pipe";
import { DateVietnamPipe } from "./date.pipe";
import { NumberFormatPipe } from "./number-format.pipe";
import { TimePipe } from "./time.pipe";
import { SafePipe } from "./safe.pipe";

@NgModule({
  declarations: [
    CountDownPipe,
    DateTimeVietnamPipe,
    DateVietnamPipe,
    NumberFormatPipe,
    TimePipe,
    SafePipe
  ],
  imports: [
  ],
  exports: [
    CountDownPipe,
    DateTimeVietnamPipe,
    DateVietnamPipe,
    NumberFormatPipe,
    TimePipe,
    SafePipe
  ]
})
export class PipesModule { }
