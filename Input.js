function Input()
{
  system.log("Constructing Input...");
  var self = this;
  self.keysPressed = '';
	self.x = 0;
	self.y = 0;
	self.screenX = 0;
	self.screenY = 0;
  self.key = {};
  self.mouseLeft = 0;
  self.mouseRight = 0;
  self.mouseMiddle = 0;
  self.iStream = new Stream();

  var keyMap = {
    65:'a', 66:'b', 67:'c', 68:'d', 69:'e', 70:'f', 71:'g', 72:'h', 73:'i', 74:'j', 75:'k', 76:'l', 77:'m',
    78:'n', 79:'o', 80:'p', 81:'q', 82:'r', 83:'s', 84:'t', 85:'u', 86:'v', 87:'w', 88:'x', 89:'y', 90:'z',
    37:'left', 38:'up', 39:'right', 40:'down', 32:'space', 17:'ctrl', 18:'alt',
    112:'f1', 113:'f2', 114:'f3', 115:'f4', 116:'f5', 117:'f6', 118:'f7', 119:'f8', 120:'f9', 121:'f10',
    48:'0', 49:'1', 50:'2', 51:'3', 52:'4', 53:'5', 54:'6', 55:'7', 56:'8', 57:'9',
    27:'escape', 8:'backspace', 13:'enter', 16:'shift', 192:'tilde', 187:'plus', 189:'minus',
    188:'comma', 190:'period', 191:'question', 186:'colon', 222:'quote', 219:'lbracket', 221:'rbracket', 220:'backslash'
  };

  $(window).mousedown(function(event) {
    switch (event.which) {
      case 1:{ system.log("Left Mouse Down...");self.mouseLeft = 1; self.initiateDrag(); break; }
      case 2:{ system.log("Middle Mouse Down...");self.mouseMiddle = 1;break; }
      case 3:{ system.log("Right Mouse Down...");self.mouseRight = 1;break; }
      default:{ system.log("Mouse Key Not Recognised..."); }
    }
  });
  $(window).mouseup(function(event) {
    switch (event.which) {
      case 1:{ system.log("Left Mouse Click...");self.mouseLeft = 3; self.resetDrag(); break; }
      case 2:{ system.log("Middle Mouse Click...");self.mouseMiddle = 3;break; }
      case 3:{ system.log("Right Mouse Click...");self.mouseRight = 3;break; }
      default:{ system.log("Mouse Key Not Recognised..."); }
    }
  });
  window.addEventListener("mousemove", function(e){ self.getMousePos(_canvas, e); });
  window.addEventListener("keydown", function(e){ self.key[keyMap[e.keyCode]] = 1; });
  window.addEventListener("keyup", function(e){ self.key[keyMap[e.keyCode]] = 3; });

  this.resetInput = function()
  { this.keysPressed = '';
    for (var k in self.key) {
      if(self.key[k] == 3) { self.key[k] = 2; } else
      if(self.key[k] == 2) {
        self.key[k] = 0;
        if(self.iStream.isOpen()){
          self.iStream.checkPressedKey(k);
        }
      } else
      if(self.key[k] == 1) { self.keysPressed += k;}
    }
    if(self.mouseLeft == 3){self.mouseLeft = 2;} else if(self.mouseLeft == 2){self.mouseLeft = 0;}
    if(self.mouseMiddle == 3){self.mouseMiddle = 2;} else if(self.mouseMiddle == 2){self.mouseMiddle = 0;}
    if(self.mouseRight == 3){self.mouseRight = 2;} else if(self.mouseRight == 2){self.mouseRight = 0;}
    if(self.dragStart){
      self.updateDrag();
    }
  }

  this.getMousePos = function(canvas, evt)
  {
    var obj = canvas, top = 0, left = 0;
    while (obj && obj.tagName != 'BODY') {top += obj.offsetTop; left += obj.offsetLeft; obj = obj.offsetParent;}
    self.x = evt.clientX - left + window.pageXOffset;
    self.y = evt.clientY - top + window.pageYOffset;
		self.screenX = (camera.x - (system.width / 2)) + self.x;
		self.screenY = (camera.y - (system.height / 2)) + self.y;
  }

  this.updateDrag = function()
  {
    self.dragOffX = self.screenX - self.dragStartX;
    self.dragOffY = self.screenY - self.dragStartY;
  }

  this.initiateDrag = function()
  {
    self.dragStart = true;
    self.dragStartX = self.screenX;
    self.dragStartY = self.screenY;
  }

  this.resetDrag = function()
  {
    self.dragStart = false;
    self.dragStartX = 0;
    self.dragStartY = 0;
    self.dragOffX = 0;
    self.dragOffY = 0;
  }; self.resetDrag();

  this.update = function()
  {
    self.resetInput();
  }
}

function Stream()
{
  var self = this;
  var stream = "";
  var open = false;
  var accept = {
    'a':'a', 'b':'b', 'c':'c', 'd':'d', 'e':'e', 'f':'f', 'g':'g', 'h':'h', 'i':'i', 'j':'j', 'k':'k', 'l':'l', 'm':'m',
    'n':'n', 'o':'o', 'p':'p', 'q':'q', 'r':'r', 's':'s', 't':'t', 'u':'u', 'v':'v', 'w':'w', 'x':'x', 'y':'y', 'z':'z',
    'space':' ', '0':'0', '1':'1', '2':'2', '3':'3', '4':'4', '5':'5', '6':'6', '7':'7', '8':'8', '9':'9',
    'backspace':'backspace', 'shift':'shift', 'minus':'-', 'period':'.'
  };
  var caps = {
    'a':'A', 'b':'B', 'c':'C', 'd':'D', 'e':'E', 'f':'F', 'g':'G', 'h':'H', 'i':'I', 'j':'J', 'k':'K', 'l':'L', 'm':'M',
    'n':'N', 'o':'O', 'p':'P', 'q':'Q', 'r':'R', 's':'S', 't':'T', 'u':'U', 'v':'V', 'w':'W', 'x':'X', 'y':'Y', 'z':'Z'
  };

  this.onInput = function(){}

  this.isOpen = function()
  {
    return open;
  }

  this.open = function()
  {
    stream = "";
    open = true;
  }

  this.close = function()
  {
    stream = "";
    open = false;
  }

  this.in = function()
  {
    return stream;
  }
  this.setStream = function(newStream)
  {
    stream = newStream;
  }

  this.addInputToStream = function(keyPress, capital)
  {
    if(keyPress == 'shift'){ return; }
    if(keyPress == 'backspace') {
      stream = stream.slice(0, stream.length - 1);
    } else {
      if(capital) {
        stream += ''+caps[keyPress]+'';
        
      } else {
        stream += ''+accept[keyPress]+'';
      }
    }
    self.onInput();
  }

  this.checkPressedKey = function(keyPress)
  {
    if(keyPress == 'escape'){
      self.close();
    }
    if(accept.hasOwnProperty(keyPress)){
      if(input.key['shift'] == 1){
        if(caps.hasOwnProperty(keyPress)){
          self.addInputToStream(keyPress, true);
        }
      } else {
        self.addInputToStream(keyPress, false);
      }
    }
  }
}