import { searchFilm } from './search';

const BODY = document.querySelector('body');
const textarea = document.querySelector('.search-form__input');
let language = Boolean(localStorage.getItem('language'));
const KEYELEM = document.createElement('div');
KEYELEM.className = 'keyelem';
BODY.appendChild(KEYELEM);


const keys = [
  'Backquote Digit1 Digit2 Digit3 Digit4 Digit5 Digit6 Digit7 Digit8 Digit9 Digit0 Minus Equal Backspace',
  'Tab KeyQ KeyW KeyE KeyR KeyT KeyY KeyU KeyI KeyO KeyP BracketLeft BracketRight Backslash Delete',
  'CapsLock KeyA KeyS KeyD KeyF KeyG KeyH KeyJ KeyK KeyL Semicolon Quote Enter',
  'ShiftLeft KeyZ KeyX KeyC KeyV KeyB KeyN KeyM Comma Period Slash ArrowUp ShiftRight',
  'ControlLeft ChangeLanguage AltLeft Space AltRight ControlRight ArrowLeft ArrowDown ArrowRight',
];
const enlang = [
  '` 1 2 3 4 5 6 7 8 9 0 - = Backspace',
  'Tab q w e r t y u i o p [ ] \\ Del',
  'CapsLock a s d f g h j k l ; \' Enter',
  'Shift z x c v b n m , . / ↑ Shift',
  'Ctrl RU/EN Alt Space Alt Ctrl ← ↓ →',
];
const shiftenlang = [
  '~ ! @ # $ % ^ & * ( ) _ + Backspace',
  'Tab Q W E R T Y U I O P { } | Del',
  'CapsLock A S D F G H J K L : " Enter',
  'Shift Z X C V B N M < > ? ↑ Shift',
  'Ctrl RU/EN Alt Space Alt Ctrl ← ↓ →',
];
const rulang = [
  'ё 1 2 3 4 5 6 7 8 9 0 - = Backspace',
  'Tab й ц у к е н г ш щ з х ъ \\ Del',
  'CapsLock ф ы в а п р о л д ж э Enter',
  'Shift я ч с м и т ь б ю . ↑ Shift',
  'Ctrl RU/EN Alt Space Alt Ctrl ← ↓ →',
];
const shiftrulang = [
  'Ё ! " № ; % : ? * ( ) _ + Backspace',
  'Tab Й Ц У К Е Н Г Ш Щ З Х Ъ \\ Del',
  'CapsLock Ф Ы В А П Р О Л Д Ж Э Enter',
  'Shift Я Ч С М И Т Ь Б Ю , ↑ Shift',
  'Ctrl RU/EN Alt Space Alt Ctrl ← ↓ →',
];
const capsenlang = [
  '` 1 2 3 4 5 6 7 8 9 0 - = Backspace',
  'Tab Q W E R T Y U I O P [ ] \\ Del',
  'CapsLock A S D F G H J K L ; \' Enter',
  'Shift Z X C V B N M , . / ↑ Shift',
  'Ctrl RU/EN Alt Space Alt Ctrl ← ↓ →',
];
const capsrulang = [
  'Ё 1 2 3 4 5 6 7 8 9 0 - = Backspace',
  'Tab Й Ц У К Е Н Г Ш Щ З Х Ъ \\ Del',
  'CapsLock Ф Ы В А П Р О Л Д Ж Э Enter',
  'Shift Я Ч С М И Т Ь Б Ю . ↑ Shift',
  'Ctrl RU/EN Alt Space Alt Ctrl ← ↓ →',
];
function delback() {
  const caretPosStart = textarea.selectionStart;
  const caretPosEnd = textarea.selectionEnd;
  const str = textarea.value.substring(0, caretPosStart);
  const str2 = textarea.value.substring(caretPosEnd, textarea.value.length);
  textarea.value = str + str2;
  textarea.selectionEnd = caretPosStart;
}
function Back() {
  const caretPosStart = textarea.selectionStart;
  const caretPosEnd = textarea.selectionEnd;
  const str = textarea.value.substring(0, caretPosEnd - 1);
  const str2 = textarea.value.substring(caretPosEnd, textarea.value.length);
  if (caretPosEnd === caretPosStart) {
    textarea.value = str + str2;
    textarea.selectionEnd = caretPosEnd - 1;
  } else {
    delback();
  }
}
function Del() {
  const caretPosStart = textarea.selectionStart;
  const caretPosEnd = textarea.selectionEnd;
  const str = textarea.value.substring(0, caretPosEnd);
  const str2 = textarea.value.substring(caretPosEnd + 1, textarea.value.length);
  if (caretPosEnd === caretPosStart) {
    textarea.value = str + str2;
    textarea.selectionEnd = caretPosEnd;
  } else {
    delback();
  }
}

function KeyLang(key, lang) {
  const keydiv = document.createElement('div');
  keydiv.classList.add('keyboard');
  KEYELEM.appendChild(keydiv);
  for (let i = 0; i < key.length; i += 1) {
    const row = key[i].split(' ');
    const rowlang = lang[i].split(' ');
    for (let j = 0; j < row.length; j += 1) {
      const div = document.createElement('div');
      div.classList.add('keys');
      div.id = row[j];
      div.innerHTML = rowlang[j];
      document.querySelector('.keyboard').appendChild(div);
    }
  }
}

function relang(lang, divclass, elem) {
  document.querySelector(divclass).remove();
  KeyLang(keys, lang);
  document.querySelector(elem).classList.add('selected');
}
function Caps(lang, nameid) {
  if (lang === true) {
    if (document.querySelector('#CapsLock').classList.contains('caps')) {
      relang(enlang, '.keyboard', `#${nameid}`);
    } else {
      relang(capsenlang, '.keyboard', `#${nameid}`);
      document.querySelector('#CapsLock').classList.add('caps');
    }
  } else if (document.querySelector('#CapsLock').classList.contains('caps')) {
    relang(rulang, '.keyboard', `#${nameid}`);
  } else {
    relang(capsrulang, '.keyboard', `#${nameid}`);
    document.querySelector('#CapsLock').classList.add('caps');
  }
}

function arrow(even) {
  if (even === 'ArrowLeft') {
    if (textarea.selectionStart === textarea.selectionEnd) {
      textarea.selectionStart -= 1;
      textarea.selectionEnd = textarea.selectionStart;
    } else {
      textarea.selectionEnd = textarea.selectionStart;
    }
  }
  if (even === 'ArrowRight') {
    if (textarea.selectionStart === textarea.selectionEnd) {
      textarea.selectionStart += 1;
      textarea.selectionEnd = textarea.selectionStart;
    } else {
      textarea.selectionEnd = textarea.selectionStart;
    }
  }
}

function Down(ev, even) {
  const caretPosStart = textarea.selectionStart;
  const caretPosEnd = textarea.selectionEnd;
  const str = textarea.value.substring(0, caretPosStart);
  const str2 = textarea.value.substring(caretPosEnd, textarea.value.length);
  let val;
  textarea.focus();
  if ((document.querySelector('#ShiftLeft').classList.contains('selected') || document.querySelector('#ShiftRight').classList.contains('selected')) && document.querySelector('#AltLeft').classList.contains('selected')) {
    if (language === true) {
      relang(rulang, '.keyboard', `#${even}`);
      language = false;
      localStorage.setItem('language', '');
    } else {
      relang(enlang, '.keyboard', `#${even}`);
      language = true;
      localStorage.setItem('language', true);
    }
  } if (even === 'ShiftLeft' || even === 'ShiftRight') {
    if (language === true) {
      if (document.querySelector('#CapsLock').classList.contains('caps')) {
        relang(enlang, '.keyboard', `#${even}`);
        document.querySelector('#CapsLock').classList.add('caps');
      } else {
        relang(shiftenlang, '.keyboard', `#${even}`);
      }
    } else if (document.querySelector('#CapsLock').classList.contains('caps')) {
      relang(rulang, '.keyboard', `#${even}`);
    } else {
      relang(shiftrulang, '.keyboard', `#${even}`);
    }
  } else if (even === 'ChangeLanguage') {
    if (language === true) {
      relang(rulang, '.keyboard', `#${even}`);
      language = false;
      localStorage.setItem('language', '');
    } else {
      relang(enlang, '.keyboard', `#${even}`);
      language = true;
      localStorage.setItem('language', true);
    }
  } else if (even === 'AltLeft' || even === 'AltRight' || even === 'ControlLeft' || even === 'ControlRight') {
    val = '';
  } else if (even === 'ArrowLeft' || even === 'ArrowDown' || even === 'ArrowRight' || even === 'ArrowUp') {
    arrow(even);
  } else if (even === 'Tab') {
    val = '  ';
    textarea.value = str + val + str2;
    textarea.selectionEnd = caretPosEnd + 2;
  } else if (even === 'Space') {
    val = ' ';
    textarea.value = str + val + str2;
    textarea.selectionEnd = caretPosEnd + 1;
  } else if (even === 'Backspace') {
    Back();
  } else if (even === 'Delete') {
    Del();
  } else if (even === 'Enter') {
    searchFilm();
  } else if (even === 'CapsLock') {
    Caps(language, even);
  } else {
    val = ev.innerHTML;
    textarea.value = str + val + str2;
    textarea.selectionEnd = caretPosStart + 1;
  }
}
function Up(even) {
  textarea.focus();
  if (even === 'ShiftLeft' || even === 'ShiftRight') {
    if (language === true) {
      if (document.querySelector('#CapsLock').classList.contains('caps')) {
        document.querySelector('.keyboard').remove();
        KeyLang(keys, capsenlang);
        document.querySelector('#CapsLock').classList.add('caps');
      } else {
        document.querySelector('.keyboard').remove();
        KeyLang(keys, enlang);
      }
    } else if (document.querySelector('#CapsLock').classList.contains('caps')) {
      document.querySelector('.keyboard').remove();
      KeyLang(keys, capsrulang);
      document.querySelector('#CapsLock').classList.add('caps');
    } else {
      document.querySelector('.keyboard').remove();
      KeyLang(keys, rulang);
    }
  }
}

function MouseDown(event) {
  if (event.target.classList.contains('keys')) {
    event.target.classList.add('selected');
    Down(event.target, event.target.id);
  }
}
function MouseUp(event) {
  if (event.target.classList.contains('keys')) {
    event.target.classList.remove('selected');
    Up(event.target.id);
  }
}

const generateKeyboard = () => {
  if (language === true) {
    KeyLang(keys, enlang);
  } else {
    KeyLang(keys, rulang);
  }
  document.querySelector('.keyboard').classList.add('hidden');
};
document.addEventListener('mousedown', MouseDown);
document.addEventListener('mouseup', MouseUp);

export default generateKeyboard;
