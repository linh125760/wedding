import { selectorAll } from '../utils/helper/function-helper';
import Util from '../utils/util';

export default class Header {
  private target: HTMLElement | null;
  private header: HTMLElement | null;
  private menuHolder: HTMLElement | null;
  private winWidth: number;
  private winHeight: number;
  private isOpen: boolean;

  constructor() {
    this.target = document.getElementById('js-hamburger');
    this.header = document.getElementById('header');
    this.menuHolder = document.getElementById('js-menu');
    this.isOpen = false;
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.init();
  }

  private init = () => {
    if (!this.target) return;
    this.activeMenu();
    this.addClickEventsToLink();
    this.target.addEventListener('click', this.handleToggle, false);

    window.addEventListener(
      'resize',
      () => {
        if (this.winWidth !== window.innerWidth) {
          this.winWidth = window.innerWidth;
          this.Sticky();
          this.changeMenuDevice();
        }
        if (this.winHeight !== window.innerHeight) {
          this.setHeightResize();
          this.winHeight = window.innerHeight;
        }
      },
      false,
    );
    window.addEventListener('load', this.Sticky, false);
    window.addEventListener('scroll', this.Sticky, false);
  };

  private addClickEventsToLink() {
    const menus: HTMLElement[] = selectorAll('.header__menu ul a:not(.js-toggle)');
    for (const menu of menus) {
      menu.addEventListener('click', () => {
        this.handleToggle();
        Util.Dispatcher.dispatchEvent('SCROLL_RELEASE');
      });
    }
  }

  private handleToggle = () => {
    if (window.innerWidth > 768) return;
    this.setHeightMenu();
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.open();
    } else {
      this.close();
    }
  };

  private Sticky = () => {
    if (!this.header) return;

    if (window.pageYOffset > 0) {
      this.header.classList.add('is-fixed');
    } else {
      this.header.classList.remove('is-fixed');
    }
  };

  private setHeightMenu = () => {
    if (this.menuHolder) {
      const timing: number = 0.4;
      const winHeight: number = window.innerHeight || 0;
      const headerHeight: number = this.header?.clientHeight || 0;
      const navHeight: number = winHeight - headerHeight;

      this.menuHolder.style.transition = `height ${timing * navHeight}ms linear`;

      if (this.isOpen) {
        this.menuHolder.style.height = '';
      } else {
        this.menuHolder.style.height = `${navHeight}px`;
        this.menuHolder.style.visibility = 'visible';
      }
      this.timeOutClean(timing * navHeight);
    }
  };

  private timeOutClean = (timing: number) => {
    setTimeout(() => {
      if (this.menuHolder) {
        this.menuHolder.style.transition = '';
        if (this.isOpen) {
          this.menuHolder.style.overflow = 'auto';
        } else {
          this.menuHolder.style.overflow = '';
          this.menuHolder.style.visibility = '';
          this.menuHolder.scrollTop = 0;
        }
      }
    }, timing);
  };

  private changeMenuDevice = () => {
    const winWidth: number = window.innerWidth || 0;
    if (winWidth > 768) {
      this.removeStyle();
      Util.Dispatcher.dispatchEvent('SCROLL_RELEASE');
    } else {
      this.setHeightResize();
    }
  };

  private removeStyle = () => {
    if (this.menuHolder) {
      this.menuHolder.style.height = '';
      this.menuHolder.style.overflow = '';
      this.menuHolder.style.visibility = '';
      this.menuHolder.scrollTop = 0;
    }
  };

  private setHeightResize = () => {
    if (this.menuHolder && this.winWidth <= 768) {
      const winHeight: number = window.innerHeight || 0;
      const headerHeight: number = this.header?.clientHeight || 0;
      const navHeight: number = winHeight - headerHeight;
      if (this.isOpen) {
        document.body.style.overflow = 'hidden';
        this.menuHolder.style.height = `${navHeight}px`;
        this.menuHolder.style.visibility = 'visible';
        this.menuHolder.style.overflow = 'auto';
        Util.Dispatcher.dispatchEvent('SCROLL_LOCK');
      }
    }
  };

  private activeMenu = () => {
    const ACTIVE_CLASS = 'is-active';
    const MENU_ITEM_SELECTOR = '.header__nav > ul li';

    const menus: HTMLElement[] = selectorAll(MENU_ITEM_SELECTOR);
    const url = document.location.pathname;
    for (const menu of menus) {
      const aLink = menu.querySelector('a') as HTMLAnchorElement;
      const aLinkName = aLink.getAttribute('data-name') as string;
      const isLocationMatched: boolean = url.includes(aLinkName);
      if (isLocationMatched) {
        menu.classList.add(ACTIVE_CLASS);
      } else {
        menu.classList.remove(ACTIVE_CLASS);
      }
    }
  };

  private open = (): void => {
    if (!this.target || !this.header) return;
    this.isOpen = true;
    this.target.classList.add('is-active');
    this.header.classList.add('is-active');
    Util.Dispatcher.dispatchEvent('SCROLL_LOCK');
  };

  private close = (): void => {
    if (!this.target || !this.header) return;
    this.isOpen = false;
    this.target.classList.remove('is-active');
    this.header.classList.remove('is-active');
    Util.Dispatcher.dispatchEvent('SCROLL_RELEASE');
  };
}
