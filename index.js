const fs = require('fs'),
    Canvas = require('canvas'),
    path = require('path'),
    Image = Canvas.Image,
    stream = require('stream');


// Canvas.registerFont(path.join(__dirname,'font/Inconsolata.otf'), {family: 'Inconsolata'});

const FONT_COLOR = '#ffffff';
const DEFAULT_SIZE = 50;


class Navatar {
  constructor(name, size = DEFAULT_SIZE) {
    size = parseInt(size,10);
    let canvas = new Canvas(size,size);
    this.canvas = canvas;

    let ctx = canvas.getContext('2d');
    this.ctx = ctx;

    // set background color
    ctx.fillStyle  = this._backgound(name);
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // get fontSize
    let fontSize = this._fontSize(size);

    // set text color
    ctx.fillStyle = FONT_COLOR;

    // set font
    ctx.font = `${fontSize}px "WenQuanYi Micro Hei"`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // get text
    let text = this._text(name);

    // get position
    let { top, left } = this._position(size,text);
    console.log(top);
    // fill text with text, x, y
    ctx.fillText(text, left, top);
  }

  write (filePath,callback) {
    fs.writeFile(filePath, this.toBuffer(),function(err) {
        err && typeof callback === 'function' && callback(err);
    });
  }

  toBuffer () {
    return this.canvas.toBuffer();
  }

  stream () {
    let sr = new stream.Readable();
    sr.push(this.toBuffer());
    sr.push(null);
    return sr;
  }

  _text (name) {
    if(!name)
      return '#';
    return name[0].toUpperCase();
  }

  _backgound (string) {
    let r, g, b;
    r = g = b = 255;
    let randint = this._randint;
    while (r + g + b > 255*2) {
      r = randint(0, 255);
      g = randint(0, 255);
      b = randint(0, 255);
    }
    return `rgb(${r},${g},${b})`;
  }

  _randint(start,end) {
    return Math.floor(Math.random() * end ) + start;
  }


  _fontSize (size) {
      return size * 0.6;
  }


  /**
   * _position - get x, y for text
   *
   * @param  {type} size
   * @param  {type} text for non-ascii text
   * @return {type}      description
   */
  _position (size,text) {

    let top =  size / 2;
    // for chinese bug see@https://github.com/Automattic/node-canvas/issues/461;e
    if(/^[\u4E00-\u9FA5]+$/.test(text)) {
      top = size / 3;
    }
    let left = size / 2;

    return {
      top,
      left
    }
  }

}


module.exports = exports = Navatar;
