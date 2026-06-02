'use strict';

{
  const IMAGES = ['seven', 'bell', 'cherry'];
  const SPIN_INTERVAL_MS = 100;

  class Panel {
    #intervalId = null;

    constructor(container) {
      const section = document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      this.img.src = `img/${IMAGES[0]}.png`;

      this.stopBtn = document.createElement('div');
      this.stopBtn.textContent = 'STOP';
      this.stopBtn.classList.add('stop', 'disabled');

      section.append(this.img, this.stopBtn);
      container.appendChild(section);
    }

    spin() {
      this.#intervalId = setInterval(() => {
        const name = IMAGES[Math.floor(Math.random() * IMAGES.length)];
        this.img.src = `img/${name}.png`;
      }, SPIN_INTERVAL_MS);
      this.stopBtn.classList.remove('disabled');
    }

    stop() {
      if (!this.isSpinning) return;
      clearInterval(this.#intervalId);
      this.#intervalId = null;
      this.stopBtn.classList.add('disabled');
    }

    get isSpinning() {
      return this.#intervalId !== null;
    }
  }

  class SlotMachine {
    #panels;
    #spinBtn;

    constructor() {
      const container = document.getElementById('container');
      this.#spinBtn = document.getElementById('spin');

      this.#panels = Array.from({ length: 3 }, () => new Panel(container));

      this.#panels.forEach(panel => {
        panel.stopBtn.addEventListener('click', () => this.#stopPanel(panel));
      });

      this.#spinBtn.addEventListener('click', () => this.#spinAll());
    }

    #spinAll() {
      if (this.#panels.some(p => p.isSpinning)) return;
      this.#panels.forEach(p => p.spin());
      this.#spinBtn.classList.add('disabled');
    }

    #stopPanel(panel) {
      panel.stop();
      if (!this.#panels.some(p => p.isSpinning)) {
        this.#spinBtn.classList.remove('disabled');
      }
    }
  }

  new SlotMachine();
}