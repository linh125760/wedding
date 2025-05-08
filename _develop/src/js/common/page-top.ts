import { selector } from '../utils/helper/function-helper';
type CallbackFunction = () => void;
/**
 *
 *
 * @export
 * @class PageTop
 *
 * usage: new PageTop() or new PageTop(topLimit, bottomLimit) or new PageTop(topLimit) new PageTop(null, bottomLimit)
 */
export default class PageTop {
  private btn: HTMLElement | null;
  private topLimit: HTMLElement | null;
  private bottomLimit: HTMLElement | null;
  private offset: number;
  private timer: number | null;
  constructor(topLimit: string | null = null, bottomLimit: string | null = null) {
    this.timer = null;
    this.btn = selector('.footer__pageTop');

    if (typeof topLimit === 'string') {
      this.topLimit = selector(topLimit);
    } else {
      this.topLimit = topLimit;
    }
    if (typeof bottomLimit === 'string') {
      this.bottomLimit = selector(bottomLimit);
    } else {
      this.bottomLimit = null;
    }

    this.offset = 0;
    this.init();
  }
  private init = () => {
    this.offset = this.getTopOffset() || window.innerHeight;
    this.action();
  };

  private action = () => {
    window.addEventListener('load', this.onScroll, false);
    window.addEventListener('resize', this.debounce(this.onResize, 10), false);
    window.addEventListener('scroll', this.onScroll, false);
  };

  private onResize = () => {
    if (window.innerWidth < 769) {
      if (this.btn) {
        this.btn.removeAttribute('style');
      }
    }
    this.offset = this.getTopOffset() || window.innerHeight;
    this.onScroll();
  };

  private onScroll = () => {
    const top: number = window.scrollY || window.pageYOffset || 0;
    const windowOffset: number = top + window.innerHeight;
    this.setPositionBottom(windowOffset);
    if (windowOffset - this.offset > 0) {
      this.btn?.classList.add('show');
      this.btn?.classList.remove('hide');
    } else {
      if (this.btn?.classList.contains('show')) {
        this.btn?.classList.remove('show');
        this.btn?.classList.add('hide');
      }
    }
  };

  private getTopOffset = () => {
    let offset: number | null = null;
    const btnHeight = this.btn ? this.btn.clientHeight : 0;
    if (this.topLimit) {
      const tempOffset: number = this.topLimit.offsetTop + this.topLimit.clientHeight;
      if (tempOffset < window.innerHeight) {
        offset = null;
      } else {
        offset = tempOffset + btnHeight;
      }
    }
    return offset;
  };

  private setPositionBottom = (windowOffset: number) => {
    if (window.innerWidth < 769 && !this.bottomLimit) return;
    const btnHeight: number = Number(this.btn?.clientHeight) / 2 || 0;
    const bottomOffset: number = Number(this.bottomLimit?.offsetTop) + Number(this.bottomLimit?.clientHeight) || 0;
    if (this.btn) {
      if (windowOffset - bottomOffset > btnHeight / 3) {
        this.btn.style.bottom = `${windowOffset - bottomOffset + btnHeight}px`;
      } else {
        // Please change with size of a psd

        this.btn.style.bottom = '35px';
      }
    }
  };

  private debounce = (fn: CallbackFunction, time: number) => {
    return (e: any) => {
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(fn, time, e);
    };
  };
}
