import {Component, OnDestroy, OnInit} from '@angular/core';
import {interval, map, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  targetDate = new Date('2025-07-18T00:00:00');
  countdown: Subscription;
  countDownTime: any = '';

  ngOnInit() {

    this.countdown = interval(1000).pipe(
      map(() => {
        const diff = this.targetDate.getTime() - Date.now();
        return {
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        };
      })
    ).subscribe(time => {
      if(time.seconds < 0) this.countDownTime = "OUT NOW!";
      else this.countDownTime = time.days + " Days " + time.hours + " Hours " + time.minutes + " Minutes " + time.seconds + " Seconds";
    });
  }

  ngOnDestroy() {
    this.countdown.unsubscribe();
  }
}
