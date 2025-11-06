// Canvas animation component for hero section background

function SineWave(config = {}) {
  this.init(config || {});
}

SineWave.prototype = {
  init: function (config) {
    this.phase = config.phase || 0;
    this.offset = config.offset || 0;
    this.frequency = config.frequency || 0.001;
    this.amplitude = config.amplitude || 1;
  },
  update: function () {
    this.phase += this.frequency;
    this.value = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.value;
  },
  getValue: function () {
    return this.value;
  },
};

function Line(config = {}) {
  this.init(config || {});
}

Line.prototype = {
  init: function (config) {
    this.spring = config.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    
    for (let i = 0; i < E.size; i++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  },
  update: function () {
    let spring = this.spring;
    let node = this.nodes[0];
    
    node.vx += (pos.x - node.x) * spring;
    node.vy += (pos.y - node.y) * spring;
    
    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i];
      
      if (i > 0) {
        const prevNode = this.nodes[i - 1];
        node.vx += (prevNode.x - node.x) * spring;
        node.vy += (prevNode.y - node.y) * spring;
        node.vx += prevNode.vx * E.dampening;
        node.vy += prevNode.vy * E.dampening;
      }
      
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= E.tension;
    }
  },
  draw: function (ctx) {
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    for (let i = 1; i < this.nodes.length - 2; i++) {
      const node1 = this.nodes[i];
      const node2 = this.nodes[i + 1];
      x = 0.5 * (node1.x + node2.x);
      y = 0.5 * (node1.y + node2.y);
      ctx.quadraticCurveTo(node1.x, node1.y, x, y);
    }
    
    const lastNode1 = this.nodes[this.nodes.length - 2];
    const lastNode2 = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(lastNode1.x, lastNode1.y, lastNode2.x, lastNode2.y);
    ctx.stroke();
    ctx.closePath();
  },
};

function Node() {
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
}

let ctx = null;
let sineWave = null;
let lines = [];
const pos = { x: 0, y: 0 };

const E = {
  debug: true,
  friction: 0.5,
  trails: 80,
  size: 50,
  dampening: 0.025,
  tension: 0.99,
};

function onMousemove(e) {
  function handleMove(e) {
    if (e.touches) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    } else {
      pos.x = e.clientX;
      pos.y = e.clientY;
    }
    e.preventDefault();
  }

  function handleTouchStart(e) {
    if (e.touches.length === 1) {
      pos.x = e.touches[0].pageX;
      pos.y = e.touches[0].pageY;
    }
  }

  function initializeLines() {
    lines = [];
    for (let i = 0; i < E.trails; i++) {
      lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
    }
  }

  document.removeEventListener("mousemove", onMousemove);
  document.removeEventListener("touchstart", onMousemove);
  document.addEventListener("mousemove", handleMove);
  document.addEventListener("touchmove", handleMove);
  document.addEventListener("touchstart", handleTouchStart);
  
  handleMove(e);
  initializeLines();
  render();
}

function render() {
  if (ctx && ctx.running) {
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = `hsla(${Math.round(sineWave.update())}, 100%, 50%, 0.025)`;
    ctx.lineWidth = 10;

    for (let i = 0; i < E.trails; i++) {
      const line = lines[i];
      line.update();
      line.draw(ctx);
    }

    ctx.frame++;
    window.requestAnimationFrame(render);
  }
}

function resizeCanvas() {
  if (ctx && ctx.canvas) {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }
}

export const renderCanvas = function () {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;
  
  ctx = canvas.getContext("2d");
  ctx.running = true;
  ctx.frame = 1;
  
  // Initialize position to center
  pos.x = window.innerWidth / 2;
  pos.y = window.innerHeight / 2;
  
  sineWave = new SineWave({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  // Initialize lines
  lines = [];
  for (let i = 0; i < E.trails; i++) {
    lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
  }

  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("touchstart", onMousemove);
  document.body.addEventListener("orientationchange", resizeCanvas);
  window.addEventListener("resize", resizeCanvas);
  
  window.addEventListener("focus", () => {
    if (ctx && !ctx.running) {
      ctx.running = true;
      render();
    }
  });

  window.addEventListener("blur", () => {
    if (ctx) {
      ctx.running = true;
    }
  });

  resizeCanvas();
  render();
};

