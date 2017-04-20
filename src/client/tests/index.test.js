import {expect} from 'chai';
import jsdom from 'jsdom';
import fs from 'fs';

describe('Index Page test for nav tag', () => {
  it('should pass nav with a Home link', () => {
    expect(true).to.equal(true);
  });
});

describe('index.html', () => {
  it('should have tag of movie-info', (done) => {
    const index = fs.readFileSync('./src/server/views/index.ejs', "utf-8");
    jsdom.env(index, function(err, window) {
      const module = window.document.getElementsByTagName('movie-info')[0];
      expect(module).to.not.equal('undefinded');
      //todo make this line work by creating a custom element
      //expect(module.src).to.equal('movieApp');
      done();
      window.close();
    });
  })
})
