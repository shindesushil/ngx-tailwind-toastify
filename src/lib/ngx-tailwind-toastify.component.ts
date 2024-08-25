import {
  Component,
  ElementRef,
  Renderer2,
  RendererFactory2,
} from '@angular/core';

interface options {
  type: string;
  message: string;
  position?: [string, string];
  animation?: string;
  messageDuration?: number;
}

@Component({
  selector: 'lib-ngx-tailwind-toastify',
  standalone: true,
  imports: [],
  template: ``,
  styles: ``,
})
export class NgxTailwindToastifyComponent {
  private renderer: Renderer2;

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
      'min-w-80',
      'w-fit',
      'h-content',
      'h-10',
      'rounded',
      'absolute',
      'flex',
      'items-center',
      'gap-2',
    ];

    switch (ops.type) {
      case 'error':
        classes.push(`bg-red-700`);
        this.createErrorIcon(div);
        break;
      case 'success':
        classes.push(`bg-lime-700`);
        this.createSuccessIcon(div);
        break;
      case 'warn':
        classes.push('bg-orange-400');
        this.createWarningIcon(div);
        break;
      case 'info':
        classes.push('bg-emerald-600');
        this.createInfoIcon(div);
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
        yCls = 'bottom-8';
      }

      if (x === 'left') {
        xCls = 'start-10';
      } else if (x === 'right') {
        xCls = 'end-10';
      }

      classes.push(yCls);
      classes.push(xCls);
    } else {
      classes.push('end-10');
      classes.push('bottom-8');
    }

    if (ops.animation && ops.animation === 'slideIn') {
      if (ops.position) {
        let direction = ops.position[1];

        if (direction === 'left') classes.push('animated-slideLeft');
        else classes.push('animated-slideRight');
      } else {
        classes.push('animated-slideRight');
      }
    } else {
      classes.push('animated-fadeId');
    }

    const style = this.renderer.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slideInRight{
        from {
          transform: translateX(10%);
          opacity: 0
        }
        to{
          transform: translateX(0);
          opacity: 1
        }
      }

      @keyframes slideInLeft{
        from {
          transform: translateX(-10%);
          opacity: 0
        }
        to{
          transform: translateX(0);
          opacity: 1
        }
      }

      .animated-fadeId {
        animation: fadeIn 0.3s ease-in-out;
      }
      .animated-slideRight{
        animation: slideInRight 0.3s ease-in-out;
      }
      .animated-slideLeft{
        animation: slideInLeft 0.3s ease-in-out;
      }
    `;

    this.renderer.appendChild(document.head, style);

    classes.forEach((cls) => this.renderer.addClass(div, cls));

    // Add text to the div
    const text = this.renderer.createText(ops.message);
    this.renderer.appendChild(div, text);

    // Append the div to the body
    this.renderer.appendChild(document.body, div);

    setTimeout(() => {
      this.renderer.removeChild(document.body, div);
      this.renderer.removeChild(document.head, style);
    }, ops.messageDuration || 3000);
  }

  createCloseIcon(host: ElementRef) {
    // Create SVG element
    const svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
    this.renderer.setAttribute(svg, 'fill', 'none');
    this.renderer.setAttribute(svg, 'stroke', 'currentColor');
    this.renderer.setAttribute(svg, 'stroke-width', '2');
    this.renderer.setAttribute(svg, 'stroke-linecap', 'round');
    this.renderer.setAttribute(svg, 'stroke-linejoin', 'round');
    this.renderer.setStyle(svg, 'width', '24px');
    this.renderer.setStyle(svg, 'height', '24px');

    // Create the first line (diagonal line from top-left to bottom-right)
    const line1 = this.renderer.createElement('line', 'svg');
    this.renderer.setAttribute(line1, 'x1', '18');
    this.renderer.setAttribute(line1, 'y1', '6');
    this.renderer.setAttribute(line1, 'x2', '6');
    this.renderer.setAttribute(line1, 'y2', '18');

    // Create the second line (diagonal line from bottom-left to top-right)
    const line2 = this.renderer.createElement('line', 'svg');
    this.renderer.setAttribute(line2, 'x1', '6');
    this.renderer.setAttribute(line2, 'y1', '6');
    this.renderer.setAttribute(line2, 'x2', '18');
    this.renderer.setAttribute(line2, 'y2', '18');

    // Append lines to the SVG
    this.renderer.appendChild(svg, line1);
    this.renderer.appendChild(svg, line2);

    // Append the SVG to the host element
    this.renderer.appendChild(host, svg);
  }

  createErrorIcon(host: ElementRef) {
    // Create SVG element
    const svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
    this.renderer.setAttribute(svg, 'fill', 'none');
    this.renderer.setAttribute(svg, 'stroke', 'currentColor');
    this.renderer.setAttribute(svg, 'stroke-width', '2');
    this.renderer.setAttribute(svg, 'stroke-linecap', 'round');
    this.renderer.setAttribute(svg, 'stroke-linejoin', 'round');
    this.renderer.setStyle(svg, 'width', '24px');
    this.renderer.setStyle(svg, 'height', '24px');

    // Create circle element
    const circle = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle, 'cx', '12');
    this.renderer.setAttribute(circle, 'cy', '12');
    this.renderer.setAttribute(circle, 'r', '10');

    // Create the first line (diagonal line from top-left to bottom-right)
    const line1 = this.renderer.createElement('line', 'svg');
    this.renderer.setAttribute(line1, 'x1', '15');
    this.renderer.setAttribute(line1, 'y1', '9');
    this.renderer.setAttribute(line1, 'x2', '9');
    this.renderer.setAttribute(line1, 'y2', '15');

    // Create the second line (diagonal line from bottom-left to top-right)
    const line2 = this.renderer.createElement('line', 'svg');
    this.renderer.setAttribute(line2, 'x1', '9');
    this.renderer.setAttribute(line2, 'y1', '9');
    this.renderer.setAttribute(line2, 'x2', '15');
    this.renderer.setAttribute(line2, 'y2', '15');

    // Append circle and lines to the SVG
    this.renderer.appendChild(svg, circle);
    this.renderer.appendChild(svg, line1);
    this.renderer.appendChild(svg, line2);

    // Append the SVG to the host element
    this.renderer.appendChild(host, svg);
  }

  createSuccessIcon(host: ElementRef) {
    // Create SVG element
    const svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
    this.renderer.setAttribute(svg, 'fill', 'none');
    this.renderer.setAttribute(svg, 'stroke', 'currentcolor');
    this.renderer.setAttribute(svg, 'stroke-width', '2');
    this.renderer.setAttribute(svg, 'stroke-linecap', 'round');
    this.renderer.setAttribute(svg, 'stroke-linejoin', 'round');
    this.renderer.setStyle(svg, 'width', '24px');
    this.renderer.setStyle(svg, 'height', '24px');

    // Create circle element
    const circle = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle, 'cx', '12');
    this.renderer.setAttribute(circle, 'cy', '12');
    this.renderer.setAttribute(circle, 'r', '10');

    // Create the checkmark path
    const check = this.renderer.createElement('path', 'svg');
    this.renderer.setAttribute(check, 'd', 'M9 12l2 2l4 -4');

    // Append circle and checkmark to the SVG
    this.renderer.appendChild(svg, circle);
    this.renderer.appendChild(svg, check);

    // Append the SVG to the host element
    this.renderer.appendChild(host, svg);
  }

  createWarningIcon(host: ElementRef) {
    // Create SVG element
    const svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
    this.renderer.setAttribute(svg, 'fill', 'none');
    this.renderer.setAttribute(svg, 'stroke', 'currentcolor');
    this.renderer.setAttribute(svg, 'stroke-width', '2');
    this.renderer.setAttribute(svg, 'stroke-linecap', 'round');
    this.renderer.setAttribute(svg, 'stroke-linejoin', 'round');
    this.renderer.setStyle(svg, 'width', '24px');
    this.renderer.setStyle(svg, 'height', '24px');

    // Create triangle element
    const polygon = this.renderer.createElement('polygon', 'svg');
    this.renderer.setAttribute(polygon, 'points', '12,2 22,20 2,20');

    // Create exclamation mark path
    const line1 = this.renderer.createElement('line', 'svg');
    this.renderer.setAttribute(line1, 'x1', '12');
    this.renderer.setAttribute(line1, 'y1', '8');
    this.renderer.setAttribute(line1, 'x2', '12');
    this.renderer.setAttribute(line1, 'y2', '12');

    const line2 = this.renderer.createElement('line', 'svg');
    this.renderer.setAttribute(line2, 'x1', '12');
    this.renderer.setAttribute(line2, 'y1', '16');
    this.renderer.setAttribute(line2, 'x2', '12');
    this.renderer.setAttribute(line2, 'y2', '16');

    // Append polygon and lines to the SVG
    this.renderer.appendChild(svg, polygon);
    this.renderer.appendChild(svg, line1);
    this.renderer.appendChild(svg, line2);

    // Append the SVG to the host element
    this.renderer.appendChild(host, svg);
  }

  createInfoIcon(host: ElementRef) {
    // Create SVG element
    const svg = this.renderer.createElement('svg', 'svg');
    this.renderer.setAttribute(svg, 'xmlns', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 24 24');
    this.renderer.setAttribute(svg, 'fill', 'none');
    this.renderer.setAttribute(svg, 'stroke', 'currentcolor');
    this.renderer.setAttribute(svg, 'stroke-width', '2');
    this.renderer.setAttribute(svg, 'stroke-linecap', 'round');
    this.renderer.setAttribute(svg, 'stroke-linejoin', 'round');
    this.renderer.setStyle(svg, 'width', '24px');
    this.renderer.setStyle(svg, 'height', '24px');

    // Create circle element
    const circle = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circle, 'cx', '12');
    this.renderer.setAttribute(circle, 'cy', '12');
    this.renderer.setAttribute(circle, 'r', '10');

    // Create the vertical line of the 'i'
    const line1 = this.renderer.createElement('line', 'svg');
    this.renderer.setAttribute(line1, 'x1', '12');
    this.renderer.setAttribute(line1, 'y1', '12');
    this.renderer.setAttribute(line1, 'x2', '12');
    this.renderer.setAttribute(line1, 'y2', '17');

    // Create the dot of the 'i' (move to center of circle)
    const circleDot = this.renderer.createElement('circle', 'svg');
    this.renderer.setAttribute(circleDot, 'cx', '12');
    this.renderer.setAttribute(circleDot, 'cy', '7');
    this.renderer.setAttribute(circleDot, 'r', '1');

    // Append circle, line, and dot to the SVG
    this.renderer.appendChild(svg, circle);
    this.renderer.appendChild(svg, line1);
    this.renderer.appendChild(svg, circleDot);

    // Append the SVG to the host element
    this.renderer.appendChild(host, svg);
  }
}
