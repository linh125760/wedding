export default class Index {
  /**
   * Creates an instance of Index.
   */
  constructor() {
    this.startCountDown();
  }

  private startCountDown(): void {
    const targetDate: Date = new Date('2025-01-01T00:00:00');

    const updateCountdown = (): void => {
      const now: Date = new Date();
      const timeRemaining: number = targetDate.getTime() - now.getTime();

      if (timeRemaining <= 0) {
        const countDownElement = document.querySelector('.count-down');
        if (countDownElement) {
          countDownElement.innerHTML = '<p class="finish">chúng tôi đã về chung một nhà</p>';
        }
        clearInterval(countdownInterval);
        return;
      }

      const days: number = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
      const hours: number = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes: number = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds: number = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      const dayElement = document.querySelector<HTMLElement>('.count-down__box:nth-child(1) .number');
      const hourElement = document.querySelector<HTMLElement>('.count-down__box:nth-child(2) .number');
      const minuteElement = document.querySelector<HTMLElement>('.count-down__box:nth-child(3) .number');
      const secondElement = document.querySelector<HTMLElement>('.count-down__box:nth-child(4) .number');

      if (dayElement) dayElement.textContent = days.toString();
      if (hourElement) hourElement.textContent = hours.toString();
      if (minuteElement) minuteElement.textContent = minutes.toString();
      if (secondElement) secondElement.textContent = seconds.toString();
    };

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Index();
});
