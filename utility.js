"use strict";

export function uniteBytes(leftNibble, rightNibble) {
    let result  = ((leftNibble - '0') << 4) + (rightNibble - '0');
    return result;
}
    
export function toHex(byteArray) {
    return byteArray.reduce((result, currentValue) => result + currentValue.toString(16).padStart(2, '0'), '').toUpperCase();
}

export function toBytes(hexString) {
    let result = [];
    for (let i = 0; i < hexString.length; i += 2)
        result.push(parseInt(hexString.substr(i, 2), 16));
    return result;
}

