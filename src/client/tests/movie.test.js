import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Our first test', () => {
  it('should pass', () => {
    expect(true).to.equal(true);
  });
});

  describe('movies.html', () => {
  it('should have h1 that says Movies', (done) => {
    const index = fs.readFileSync('./src/client/app/views/home.html', "utf-8");
    jsdom.env(index, function(err, window) {
      const h1 = window.document.getElementsByTagName('h1')[0];
      expect(h1.innerHTML).to.equal("Movies:");
      done();
      window.close();
    });
  })
})
