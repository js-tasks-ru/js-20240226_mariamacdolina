class Tooltip {

  constructor() {
    if (Tooltip.instance) {
      return Tooltip.instance;
    }      
    Tooltip.instance = this;

    this.initialize();
    this.element = this.createElement();
  }

  createElement() {
    const element = document.createElement('div');
    element.classList.add('tooltip');
    return element;
  }
  
  initialize () {
    document.addEventListener('pointerover', this.handlePointerOver);
    document.addEventListener('pointerout', this.handlePointerOut);
  }

  render(text = '') {
    this.element.textContent = text;
    document.body.appendChild(this.element);
  }

  handlePointerOver(event) {
    const target = event.target;
    if (target.dataset.tooltip) {
      const tooltipText = target.dataset.tooltip;
      Tooltip.instance.render(tooltipText);
    }
  }

  handlePointerOut() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  destroy() {
      this.handlePointerOut();
  }

}

export default Tooltip;