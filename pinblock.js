"use strict";

import { toHex, toBytes } from './utility'
let CryptoJS = require('crypto-js');

export function encode(pin, pan, key) {
    let pinHead = pin.length.toString().padStart(2, '0') + pin;
    let pinData = pinHead.padEnd(16, 'F');
  	let pinPart = toBytes(pinData);
  
    let panData = pan.substring(3, 15).padStart(16, '0');
    let panPart = toBytes(panData);
  
    let pinBlock = pinPart.map((currentValue, currentIndex) => currentValue ^ panPart[currentIndex]);

    let keyData = CryptoJS.enc.Hex.parse(key);
    let plainMessage = CryptoJS.enc.Hex.parse(toHex(pinBlock));
    let extendedPinBlock = CryptoJS.TripleDES.encrypt(plainMessage, keyData, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding
    });
    
    return CryptoJS.enc.Hex.stringify(extendedPinBlock.ciphertext).toUpperCase();
}

export function decode(pan, extendedPinBlock, key) {
    
    let keyData = CryptoJS.enc.Hex.parse(key);
    let cipherMessage = CryptoJS.lib.WordArray; 
    cipherMessage.ciphertext = CryptoJS.enc.Hex.parse(extendedPinBlock);
    let pinBlock = CryptoJS.TripleDES.decrypt(cipherMessage, keyData, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding
    });
    let pinBlockPart = toBytes(CryptoJS.enc.Hex.stringify(pinBlock));

    let panData = pan.substring(3, 15).padStart(16, '0');
    let panPart = toBytes(panData);
  
    let pinData = panPart.map((currentValue, currentIndex) => currentValue ^ pinBlockPart[currentIndex]);
    
    let pin = toHex(pinData);
    let pinLen = parseInt(pin.substring(0, 2));
    return pin.substring(2, 2 + pinLen);  
}

