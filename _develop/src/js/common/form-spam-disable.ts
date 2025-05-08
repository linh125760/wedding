export default class FormSpam {
  private _formInstance: FormSpamElem[] | null = [];
  constructor() {
    window.addEventListener('pageshow', this.init, false)
  }
  private init = () => {

    this._formInstance = [];
    const _formList: HTMLFormElement[] = Array.prototype.slice.call(document.getElementsByTagName('form'));
    for (const _form of _formList) {
      if (this._formInstance) {
        this._formInstance.push(new FormSpamElem(_form));
      }
    }
  }
}


class FormSpamElem {
  private _isCanSubmit: boolean = true;
  constructor(_form: HTMLFormElement) {
    if (!_form) return

    _form.onsubmit = () => {
      if (!this._isCanSubmit) {
        return false;
      }
      else {
        const btn = document.querySelector('.form-wrapper--confirm button[type="submit"]');
        btn?.classList.add('disabled');
        this._isCanSubmit = false
        return true;
      }
    }

  }
}