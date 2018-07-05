import h from './h';
import tippy from 'tippy.js';
import Gantt from './gantt';
import render from './render/svg';
import { getFont } from './gantt/styles';
import { formatData, textWidth } from './utils';

export default class SVGGantt {
  constructor(element, data, options = {}) {
    this.dom = typeof element === 'string' ? document.querySelector(element) : element;
    this.data = formatData(data);
    this.options = options;
    this.render();
  }
  setData(data) {
    this.data = formatData(data);
    this.render();
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
    this.render();
  }
  render() {
    const { data, options } = this;
    if (this.tree) {
      this.dom.removeChild(this.tree);
    }
    const font = getFont(options.styleOptions || {});
    options.maxTextWidth = Math.max.apply(null, data.map(v => textWidth(v.name, font, 20)));
    this.tree = render(<Gantt data={data} {...options} />);
    this.dom.appendChild(this.tree);
    if (options.toolTip) {
      const tip = typeof options.toolTip === 'boolean' ? {} : options.toolTip;
      tippy('.bar>g', tip);
    }
  }
}
