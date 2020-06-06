import { equal } from 'assert'
import { encode, decode } from '../pinblock'

describe('Pinblock', function() {
  describe('#encode()', function() {
    it('should encode the pin & pan & key to generate extended pinblock', function() {
        let pin = '1234';
        let pan = '6037997390214444'
        let key = '000102030405060708090A0B0C0D0E0F';   
        let pinBlock = encode(pin, pan, key);   
        const expectedResult = 'C7933494F32B43F6';
        equal(pinBlock, expectedResult);
    });
  });
  describe('#decode()', function() {
    it('should decode the pin & pan & key to generate extended pinblock', function() {
        let pinBlock = 'C7933494F32B43F6';
        let pan = '6037997390214444'
        let key = '000102030405060708090A0B0C0D0E0F';   
        let pin = decode(pan, pinBlock, key);   
        const expectedResult = '1234';
        equal(pin, expectedResult);
    });
  });
});