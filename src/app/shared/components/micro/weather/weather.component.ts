import { Component, Injector } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { WeatherService } from 'src/app/shared/services/weather/weather.service';
import { takeUntil } from 'rxjs';
import { Weather } from 'src/app/models/weather/weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent extends BaseComponent {

  weatherModel: Weather = new Weather();

  lastUpdated: any;

  constructor(
    injector: Injector,
    public weatherService: WeatherService
  ) {
    super(injector);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.isLoading = true;
    this.getCurrentWeather();

    setInterval( () => {
      this.getCurrentWeather();
    }, 60000);
  }

  getCurrentWeather() {
    this.weatherService
      .getCurrentTemp()
      .pipe(takeUntil(this._onDestroySub))
      .subscribe(resp => {
        if (resp.code == 'success') {
          this.weatherModel = resp.data;
          this.lastUpdated = new Date(this.weatherModel.lastUpdated * 1000);
        }
        this.isLoading = false;
      });
  }
}
