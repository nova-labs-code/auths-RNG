// ── popup.js!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// HTML POPUPS ARE A FUCK

(function () {
  const OVERLAY_CSS =
    'position:fixed;inset:0;background:rgba(0,0,0,0.85);z-index:20001;' +
    'display:flex;align-items:center;justify-content:center;';

  const BOX_CSS =
    'background:var(--panel-bg);border:1px solid var(--border-color);' +
    'border-radius:4px;padding:28px 24px 20px;max-width:420px;width:90%;' +
    'text-align:center;color:var(--text-color);font-family:monospace;';

  const BTN_BASE =
    'padding:8px 20px;border:1px solid var(--border-color);' +
    'color:var(--text-color);font-family:monospace;border-radius:2px;cursor:pointer;';

  const BTN_PRIMARY = BTN_BASE + 'background:var(--button-bg);';
  const BTN_CANCEL  = BTN_BASE + 'background:transparent;opacity:0.6;';

  const INPUT_CSS =
    'width:100%;padding:8px;background:var(--input-bg);' +
    'border:1px solid var(--border-color);color:var(--text-color);' +
    'font-family:monospace;border-radius:2px;margin-bottom:16px;box-sizing:border-box;';

  const MSG_CSS = 'font-size:0.9em;opacity:0.75;margin-bottom:16px;white-space:pre-wrap;';
  const TITLE_CSS = 'font-size:1em;font-weight:bold;margin-bottom:10px;';
  const BTN_ROW_CSS = 'display:flex;gap:10px;justify-content:center;';

  function removeExisting() {
    const el = document.getElementById('customPopupOverlay');
    if (el) el.remove();
  }

  function makeOverlay() {
    removeExisting();
    const overlay = document.createElement('div');
    overlay.id = 'customPopupOverlay';
    overlay.style.cssText = OVERLAY_CSS;
    return overlay;
  }

  function makeBox() {
    const box = document.createElement('div');
    box.style.cssText = BOX_CSS;
    return box;
  }

  function makeTitle(text) {
    if (!text) return null;
    const el = document.createElement('div');
    el.style.cssText = TITLE_CSS;
    el.textContent = text;
    return el;
  }

  function makeMessage(text) {
    const el = document.createElement('div');
    el.style.cssText = MSG_CSS;
    el.textContent = text;
    return el;
  }

  function makeButton(label, css, onClick) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.cssText = css;
    btn.addEventListener('click', onClick);
    return btn;
  }

  function makeBtnRow(...buttons) {
    const row = document.createElement('div');
    row.style.cssText = BTN_ROW_CSS;
    buttons.forEach((b) => row.appendChild(b));
    return row;
  }

  function mount(overlay, box) {
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  window.showAlert = function (message, title) {
    return new Promise((resolve) => {
      const overlay = makeOverlay();
      const box     = makeBox();

      const titleEl = makeTitle(title);
      if (titleEl) box.appendChild(titleEl);
      box.appendChild(makeMessage(message));

      const close = () => { overlay.remove(); resolve(); };

      box.appendChild(
        makeBtnRow(makeButton('ok', BTN_PRIMARY, close))
      );

      overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Enter' || e.key === 'Escape') {
          document.removeEventListener('keydown', handler);
          close();
        }
      });

      mount(overlay, box);
    });
  };

  window.showConfirm = function (message, title) {
    return new Promise((resolve) => {
      const overlay = makeOverlay();
      const box     = makeBox();

      const titleEl = makeTitle(title);
      if (titleEl) box.appendChild(titleEl);
      box.appendChild(makeMessage(message));

      const finish = (result) => { overlay.remove(); resolve(result); };

      box.appendChild(
        makeBtnRow(
          makeButton('cancel', BTN_CANCEL,  () => finish(false)),
          makeButton('ok',     BTN_PRIMARY, () => finish(true))
        )
      );

      overlay.addEventListener('click', (e) => { if (e.target === overlay) finish(false); });
      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Enter')  { document.removeEventListener('keydown', handler); finish(true);  }
        if (e.key === 'Escape') { document.removeEventListener('keydown', handler); finish(false); }
      });

      mount(overlay, box);
    });
  };

  window.showPrompt = function (message, defaultVal) {
    return new Promise((resolve) => {
      const overlay = makeOverlay();
      const box     = makeBox();

      box.appendChild(makeMessage(message));

      const input = document.createElement('input');
      input.type = 'text';
      input.value = defaultVal ?? '';
      input.style.cssText = INPUT_CSS;
      box.appendChild(input);

      const finish = (value) => { overlay.remove(); resolve(value); };

      box.appendChild(
        makeBtnRow(
          makeButton('cancel', BTN_CANCEL,  () => finish(null)),
          makeButton('ok',     BTN_PRIMARY, () => finish(input.value))
        )
      );

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter')  finish(input.value);
        if (e.key === 'Escape') finish(null);
      });

      overlay.addEventListener('click', (e) => { if (e.target === overlay) finish(null); });

      mount(overlay, box);
      setTimeout(() => input.focus(), 50);
    });
  };
})();
