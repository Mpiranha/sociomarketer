function formatCardNumber(number) {
    var cardNumber = number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    return cardNumber;
}

function onlyDigitsKeydown(e) {
    const ALLOWED_CHARS_REGEXP = /[0-9]+/;


    if (!ALLOWED_CHARS_REGEXP.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
}

function onlyDigitsCvc(e) {
    const ALLOWED_CHARS_REGEXP = /[0-9]+/;


    if (!ALLOWED_CHARS_REGEXP.test(e.key) && e.key !== 'Tab' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
}

function reFormatNumeric(e) {
    var target, value;
    target = e.currentTarget;
    value = target.value;
    value = formatNumeric(value);
    target.value = value;
}



function formatCardExpiry(expiry) {
    expiry = expiry.replace(
        /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
    ).replace(
        /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
    ).replace(
        /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
    ).replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
    ).replace(
        /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
    ).replace(
        /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
    ).replace(
        /\/\//g, '/' // Prevent entering more than 1 `/`
    );

    return expiry;
}




function formatCardCVC(cvc) {
    return cvc.replace(/[^\d]/g, '');
}




function formatNumeric(num) {
    return num.replace(/[^\d]/g, '');
}

function cardType(num) {
    if (/^5[1-5]/.test(num)) {
        return 'mastercard';
    } else if (/^4/.test(num)) {
        return 'visa';
    } else if (/^3[47]/.test(num)) {
        return 'amex';
    } else if (/^3(?:0[0-5]|[68])/.test(num)) {
        return 'dinersclub';
    } else if (/^6(?:011|5)/.test(num)) {
        return 'discover';
    } else if (/^(?:2131|1800|35\d{3})/.test(num)) {
        return 'jcb';
    }
    return undefined;
}



function luhnCheck(num) {
    var digit, digits, i, len, odd, sum;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (i = 0, len = digits.length; i < len; i++) {
        digit = digits[i];
        digit = parseInt(digit, 10);
        if ((odd = !odd)) {
            digit *= 2;
        }
        if (digit > 9) {
            digit -= 9;
        }
        sum += digit;
    }
    return sum % 10 === 0;
}

function hasTextSelected(target) {
    var e, ref;
    if ((target.selectionStart != null) && target.selectionStart !== target.selectionEnd) {
        return true;
    }
    if (typeof document !== 'undefined' && document !== null ? (ref = document.selection) != null ? typeof ref.createRange === "function" ? ref.createRange().text : void 0 : void 0 : void 0) {
        return true;
    }
    try {
        return document.selection.createRange().text.length > 0;
    } catch (error) {
        e = error;
        return false;
    }
}


function reFormatCardNumber(e) {
    var target, value;
    target = e.currentTarget;
    value = target.value;
    value = formatCardNumber(value);
    target.value = value;
}



function reFormatExpiry(e) {
    var target, value;
    target = e.currentTarget;
    value = target.value;
    value = formatCardExpiry(value);
    target.value = value;
}

function reFormatCVC(e) {
    var target, value;
    target = e.currentTarget;
    value = target.value;
    value = formatCardCVC(value);
    target.value = value;
}

function cardNumberInput(e) {
    var card, target, value;
    target = e.currentTarget;
    value = target.value;
    card = cardType(value);

    if (!card) {
        return;
    }

    if (card === 'amex') {
        target.setAttribute('maxlength', '17');
    } else {
        target.setAttribute('maxlength', '19');
    }

    if (target.value.length == target.getAttribute('maxlength')) {
        $(target).next().children('.card-expiry').focus();
    }


    if (hasTextSelected(target)) {
        return;
    }

    if (card === 'amex') {
        reFormatCardNumber(e);
    } else {
        reFormatCardNumber(e);
    }


}

function cardNumberKeyup(e) {
    var target, value;
    target = e.currentTarget;
    value = target.value;
    value = formatCardNumber(value);
    target.value = value;
}



function expiryInput(e) {
    var target, value;
    target = e.currentTarget;
    value = target.value;
    value = formatCardExpiry(value);
    target.value = value;

    if (target.value.length == target.getAttribute('maxlength')) {
        $(target).next().siblings('.card-cvv').focus();
    }
}

function cvcInput(e) {
    var target, value;
    target = e.currentTarget;
    value = target.value;
    value = formatCardCVC(value);
    target.value = value;
}


function cardNumberPaste(e) {
    var target, value;
    target = e.currentTarget;
    value = e.clipboardData.getData('Text');
    value = formatCardNumber(value);
    target.value = value;
}

function expiryPaste(e) {
    var target, value;
    target = e.currentTarget;
    value = e.clipboardData.getData('Text');
    value = formatCardExpiry(value);
    target.value = value;
}

function cvcPaste(e) {
    var target, value;
    target = e.currentTarget;
    value = e.clipboardData.getData('Text');
    value = formatCardCVC(value);
    target.value = value;
}

$('.card-number').on('keydown', function (e) {
    onlyDigitsKeydown(e);
});

$('.card-number').on('keyup', function (e) {
    cardNumberKeyup(e);
});

$('.card-number').on('input', function (e) {
    cardNumberInput(e);
});

$('.card-expiry').on('keydown', function (e) {
    onlyDigitsKeydown(e);
});

$('.card-expiry').on('input', function (e) {
    expiryInput(e);
});

$('.card-cvc').on('keydown', function (e) {
    onlyDigitsCvc(e);
});

$('.card-cvv').on('input', function (e) {
    cvcInput(e);
});


