import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateMarkupButton(currentPage, 'next');
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateMarkupButton(currentPage, 'prev');
    }

    // Other page
    if (currentPage < numPages) {
      return (
        this._generateMarkupButton(currentPage, 'prev') +
        this._generateMarkupButton(currentPage, 'next')
      );
    }

    // Page 1, and there are NO other pages
    return '';
  }

  _generateMarkupButton(currentPage, direction) {
    const goToPage = direction === 'next' ? currentPage + 1 : currentPage - 1;
    return `
      <button data-goto="${goToPage}" class="btn--inline pagination__btn--${direction}">
        ${direction === 'prev' ? '<svg><use href="${icons}#icon-arrow-left"></use></svg>' : ''}
        <span>Page ${goToPage}</span>
        ${direction === 'next' ? '<svg><use href="${icons}#icon-arrow-right"></use></svg>' : ''}
      </button>
    `;
  }
}
export default new PaginationView();
