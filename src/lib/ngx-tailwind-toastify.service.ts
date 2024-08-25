import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

interface options {
  type: string;
  message: string;
  position?: [string, string];
}

@Injectable({
  providedIn: 'root',
})
export class NgxTailwindToastifyService {
  private renderer: Renderer2;

  errorColor = '#c42300';
  successColor = '#00CC66';

  constructor(private rendererFactory: RendererFactory2) {
    // Initialize Renderer2
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  show(ops: options) {
    console.log('running');

    // Create a new div element
    const div = this.renderer.createElement('div');

    let classes = [
      'px-2',
      'py-3',
      'text-white',
      'w-content',
      'min-w-56',
      'h-10',
      'rounded',
      'absolute',
      'end-5',
      'bottom-7',
      'flex',
      'items-center',
      'animated',
    ];

    switch (ops.type) {
      case 'error':
        classes.push(`bg-red-700`);
        break;
      case 'success':
        classes.push(`bg-lime-700`);
        break;
      default:
        break;
    }

    if (ops.position) {
      let [y, x] = ops.position;
      let yCls = '',
        xCls = '';

      if (y === 'top') {
        yCls = 'top-7';
      } else if (y === 'bottom') {
        yCls = 'bottom-7';
      }

      if (x === 'left') {
        xCls = 'start-5';
      } else if (x === 'right') {
        xCls = 'end-5';
      }

      classes.push(yCls);
      classes.push(xCls);
    } else {
      classes.push('end-5');
      classes.push('bottom-7');
    }

    classes.forEach((cls) => this.renderer.addClass(div, cls));

    const style = this.renderer.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animated {
        animation: fadeIn 0.3s ease-in-out;
      }
    `;

    this.renderer.appendChild(document.head, style);

    // Add text to the div
    const text = this.renderer.createText(ops.message);
    this.renderer.appendChild(div, text);

    // Append the div to the body
    this.renderer.appendChild(document.body, div);

    setTimeout(() => {
      this.renderer.removeChild(document.body, div);
      this.renderer.removeChild(document.head, style);
    }, 3000);
  }
}
