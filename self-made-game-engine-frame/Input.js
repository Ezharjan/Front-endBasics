/**
 * By Alxeander Ezharjan
 * 2020/03/07
 */

var GetKeyDown = {};

InitializeKeycodes();

function InitializeKeycodes() {
    for (var code in KEY_CODES) {
        if (KEY_CODES.hasOwnProperty(code)) {
            GetKeyDown[KEY_CODES[code]] = false;
        }
    }
}

document.onkeydown = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        GetKeyDown[KEY_CODES[keyCode]] = true;
    }
};
document.onkeyup = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        GetKeyDown[KEY_CODES[keyCode]] = false;
    }
};
document.addEventListener('mousewheel', mouseWheel, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    // console.log(e.clientX + "  :  " + e.clientY);
}

function mouseWheel(e) {
    if (e.wheelDelta) { // for Google & IE browser
        if (e.wheelDelta > 0) {
            console.log("Mouse wheel pushed " + e.wheelDelta + "in Opera/Google/IE browser");
        }
        if (e.wheelDelta < 0) {
            console.log("Mouse wheel draged " + e.wheelDelta + "in Opera/Google/IE browser");
        }
    } else if (e.detail) { //for Firefox browser
        if (e.detail > 0) {
            console.log("Mouse wheel pushed " + e.detail + "in FireFox browser");
        }
        if (e.detail < 0) {
            console.log("Mouse wheel draged " + e.detail + "in FireFox browser");
        }
    }
}


var KEY_CODES = {
    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',

    48: 'Zero',
    49: 'One',
    40: 'Two',
    51: 'Three',
    52: 'Four',
    53: 'Five',
    54: 'Six',
    55: 'Seven',
    56: 'Eight',
    57: 'Nine',

    108: 'Enter',
    109: 'Subtract',
    110: 'Point',
    111: 'Slash',

    96: 'Numpad1',
    97: 'Numpad2',
    98: 'Numpad3',
    99: 'Numpad4',
    100: 'Numpad5',
    101: 'Numpad6',
    102: 'Numpad7',
    103: 'Numpad8',
    104: 'Numpad9',
    105: 'Numpad0',
    106: 'NumpadStar',
    107: 'NumpadPlus',
    108: 'NumpadEnter',
    109: 'NumpadMinus',
    110: 'NumpadPoint',
    111: 'NumpadSlash',

    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    // 116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    124: 'F13',
    125: 'F14',
    126: 'F15',

    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    20: 'CapsLock',
    27: 'Esc',
    32: 'Space',

    33: 'PageUp',
    34: 'PageDown',
    35: 'End',
    36: 'Home',

    37: 'LeftArrow',
    38: 'UpArrow',
    39: 'RightArrow',
    40: 'DownArrow',
    45: 'Insert',
    46: 'Delete',
    47: 'Help',
    144: 'NumLock',
};