import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  @Input() itemsLength: number;
  @Input() itemsToShow = 10;
  @Input() page = 1;
  @Output() pageChanged = new EventEmitter();
  @Output() rowsCountChanged = new EventEmitter();

  offset = 2;
  pages: Array<number>;
  itemsCountOptions = [
    {
      label : 10,
      value: 10
    },
    {
      label : 20,
      value: 20
    },
    {
      label : 30,
      value: 30
    },
  ];

  get pagesCount () {
    return Math.ceil(this.itemsLength / this.itemsToShow);
  }

  ngOnChanges () {
    this.initPagination();
  }

  initPagination() {
    this.pages = [];
    let startIndex = this.page > this.offset ? this.page - this.offset : 1;
    const endIndex = this.page + this.offset > this.pagesCount ? this.pagesCount : this.page + this.offset;

    for (; startIndex <= endIndex; startIndex++) {
      this.pages.push(startIndex);
    }
  }

  nextPage () {
    this.page++;
    this.changePage();
  }

  previousPage() {
    this.page--;
    this.changePage();
  }

  goFirstPage () {
    this.page = 1;
    this.changePage();
  }

  goLastPage () {
    this.page = this.pagesCount;
    this.changePage();
  }

  changePage () {
    this.pageChanged.emit(this.page);
    this.initPagination();
  }

  goToPage(page: number) {
    this.page = page;
    this.changePage();
  }

  itemsCountChanged (count: number) {
    this.rowsCountChanged.emit(count);
  }
}
