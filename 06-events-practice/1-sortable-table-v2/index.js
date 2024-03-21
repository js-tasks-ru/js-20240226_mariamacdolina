import SortableTable1 from '../../05-dom-document-loading/2-sortable-table-v1/index.js'
export default class SortableTable2 extends SortableTable1 {

  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {

    super(headersConfig, data)
    this.sorted = sorted;
    this.createEventListeners();
  }

  handleHeaderPointerdown = (event) => {
    const headerCell = event.target.closest('[data-sortable]');
    if (headerCell) {
      const field = headerCell.dataset.id;
      const order = headerCell.dataset.order === 'asc' ? 'desc' : 'asc';

      this.sort(field, order);
      this.updateHeaderArrows(headerCell);
      this.updateBody();
    }
  }

  createEventListeners() {
    this.element.addEventListener('pointerdown', this.handleHeaderPointerdown);
  }
  
  updateHeaderArrows(currentHeaderCell) {
    for (const cell of Object.values(this.subElements)) {
      if (cell !== currentHeaderCell) {
        cell.dataset.order = '';
      }
    }
    currentHeaderCell.dataset.order = currentHeaderCell.dataset.order === 'asc' ? 'desc' : 'asc';
  }

  updateBody() {
    const body = this.element.querySelector('.sortable-table__body');
    body.innerHTML = this.createBodyTemplate();
  }  
  
  destroyEventListeners() {
    this.element.removeEventListener('pointerdown', this.handleHeaderPointerdown);
  }

  destroy() {
      super.destroy();
      this.destroyEventListeners();
  }

}
// Почему то не проходит проверку на на сорт desc, при этом в консоли нет ошибок, и физически сортировка работает
// На что обратить внимание? хелп
// × should sort "desc" correctly for "sortType" equal string (62ms)                                                                
// × should sort "desc" correctly for "sortType" equal number (26ms) 