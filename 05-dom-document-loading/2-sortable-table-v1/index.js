export default class SortableTable {
  constructor(headerConfig = [], data = []) {
      this.data = data;
      this.headerConfig = headerConfig;

      this.element = this.createElement(this.createTemplate());
      this.subElements = this.createSubElements(this.element);
  }
  
  createElement(template) {
    const element = document.createElement('div');
    element.innerHTML = template;
    return element.firstElementChild;
  }

  createSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');
    for (const subElement of elements) {
      const name = subElement.dataset.element;
      result[name] = subElement;
    }
    return result;
  }

  createBodyTemplate() {
    return (
      this.data.map(rowData => 
        `
          <div class="sortable-table__row">
            ${this.headerConfig.map((config) => this.createBodyColumnTemplate(config, rowData)).join('')}
          </div>
        `
      )
    ).join('')
  }

  createBodyColumnTemplate(config, rowData) {
    if (config.template) {
      return config.template(rowData)
    }
    return `<div class="sortable-table__cell">${rowData[config.id]}</div>`;
  }

  createHeaderTemplate() {
    return (
        this.headerConfig.map((config) =>
          `<div class="sortable-table__cell" data-id="${config.id}" data-sortable="${config.sortable}" data-order="">
            <span>${config.title}</span>
            ${config.sortable ? `
              <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
              </span>` : ''
          }
          </div>
    `)).join('')
  }

  sort(field, order) {
    const col = this.headerConfig.find(c => c.id === field);
    if (!col || !col.sortable) return;

    if (col.sortType === 'number') {
        this.data.sort((a, b) => order === 'asc' ? a[field] - b[field] : b[field] - a[field]);
    } else {
        this.data.sort((a, b) => order === 'asc' ? a[field].localeCompare(b[field], "ru", { caseFirst: "upper" }) : b[field].localeCompare(a[field], "ru", { caseFirst: "upper" }));
    }

    const bodyElement = this.element.querySelector('[data-element="body"]');
    bodyElement.innerHTML = this.createBodyTemplate();
  }

  createTemplate() {
      return (`
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.createHeaderTemplate()}
          </div>
          <div data-element="body" class="sortable-table__body">
            ${this.createBodyTemplate()}
          </div>
        <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
        <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
          <div>
            <p>No products satisfies your filter criteria</p>
            <button type="button" class="button-primary-outline">Reset all filters</button>
          </div>
        </div>
      </div>
      `)
  }

  remove() {
    this.element.remove()
  }

  destroy() {
      this.remove();
  }

}