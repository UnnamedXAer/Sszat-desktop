export default class SendPanelKeyDown {
    constructor(selectOption, closePanel, options) {
        this.selectOption = selectOption;
        this.closePanel = closePanel;
        this.options = options;
        this.keyDownTimeout = null;
        this.lastKeyCodeWithTime = null;
    }

    handler = (ev) => {
        const keyCode = ev.keyCode;
    
        if (keyCode === 27) {
            this.closePanel();
        }
        else if (ev.ctrlKey) {
            this.withCtrlKeyDown(keyCode);
        }
        else {
            this.clearTimeoutAndNullyfy();
        }
    }

    withCtrlKeyDown = (keyCode) => {
        if (keyCode >= 48 && keyCode <= 57) {
            this.withCtrlAndDigitPressed(keyCode);
        }
        else {
            this.clearTimeoutAndNullyfy();
        }    
    }

    withCtrlAndDigitPressed = (keyCode) => {
        if (this.lastKeyCodeWithTime && Date.now() - this.lastKeyCodeWithTime.time <= 1000) {
            this.withCtrlWhenTwoDigitsPressed(keyCode);
        }
        else {
            this.withCtrlWhenOneDigitsPressed(keyCode);
        }
    }

    withCtrlWhenTwoDigitsPressed = (keyCode) => {
        const firstPressedDigit = String.fromCharCode(this.lastKeyCodeWithTime.keyCode);
        const secondPressedDigit = String.fromCharCode(keyCode);
        const index = (firstPressedDigit*10) + +secondPressedDigit;
        this.selectOptionByIndex(index);
        this.clearTimeoutAndNullyfy();
    }

    withCtrlWhenOneDigitsPressed = (keyCode) => {
        this.lastKeyCodeWithTime = {
            keyCode: keyCode,
            time: Date.now()
        };
        this.keyDownTimeout = setTimeout(() => {
            const pressedDigit = String.fromCharCode(this.lastKeyCodeWithTime.keyCode);
            this.selectOptionByIndex(pressedDigit);
        }, 1000);
    }

    clearTimeoutAndNullyfy() {
        clearTimeout(this.keyDownTimeout);
        this.keyDownTimeout = null;
    }

    selectOptionByIndex = (index) => {
        const selectedEmoticonIconName = this.options[index-1];
        if (selectedEmoticonIconName) {
            this.selectOption(selectedEmoticonIconName);
        }
    }
}