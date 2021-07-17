import React, { FC, useCallback, useState } from 'react';
import { Pagination as BasePagination } from 'reactstrap';
import cx from 'classnames';
import { v4 } from 'uuid';

import images from 'assets/images/common/ImageCommon';

interface Props {
  center?: boolean;
  className?: string;
  page: number;
  totalPage: number;
  onChangePage: (page: number) => void;
  placeholder?: string;
  titleButton?: string;
  isShowGoToPage?: boolean;
}

const Pagination: FC<Props> = ({
  page,
  totalPage,
  onChangePage,
  center = true,
  className = '',
  placeholder,
  titleButton,
  // show or hide go to page
  isShowGoToPage = true,
}) => {
  const [numberPage, setNumberPage] = useState<string>('');

  const handleGoToPage = useCallback(
    (e) => {
      e.preventDefault();
      if (Number(numberPage) > 0) {
        if (Number(numberPage) > totalPage) {
          onChangePage(1);
        } else {
          onChangePage(Math.round(Number(numberPage)));
        }
      }
    },
    [numberPage, totalPage, onChangePage],
  );

  const renderListPage = useCallback(() => {
    const pageBufferSize = 1;
    const items: Array<number> = [];
    if (totalPage <= 3 + pageBufferSize * 2) {
      for (let i = 1; i <= totalPage; i += 1) {
        items.push(i);
      }
    } else {
      let left = Math.max(1, page - pageBufferSize);
      let right = Math.min(page + pageBufferSize, totalPage);
      if (page - 1 <= pageBufferSize) {
        right = 1 + pageBufferSize * 2;
      }
      if (totalPage - page <= pageBufferSize) {
        left = totalPage - pageBufferSize * 2;
      }
      for (let i = left; i <= right; i += 1) {
        items.push(i);
      }
      if (page - 1 >= pageBufferSize * 2 && page !== 1 + 2) {
        items.unshift(0);
      }
      if (totalPage - page >= pageBufferSize * 2 && page !== totalPage - 2) {
        items.push(0);
      }
      if (left !== 1) {
        items.unshift(1);
      }
      if (right !== totalPage) {
        items.push(totalPage);
      }
    }
    return items.map((item) => {
      return item === 0 ? (
        <div key={v4()} className={'paging-other-item'}>
          <button type="button">...</button>
        </div>
      ) : (
        <div
          key={item}
          className={cx('paging-item', { active: page === item })}
        >
          <button type="button" onClick={() => onChangePage(item)}>
            {item}
          </button>
        </div>
      );
    });
  }, [onChangePage, page, totalPage]);

  // if (totalPage <= 1) {
  //   return null;
  // }
  return (
    <BasePagination
      className={cx(
        {
          'paging-center': center,
        },
        className,
      )}
    >
      <div
        className={cx('paging-item', {
          disabled: page === 1,
        })}
      >
        <button type="button" onClick={() => onChangePage(page - 1)}>
          <span>
            <img src={images.icArrowLeft} alt={'prev'} />
          </span>
        </button>
      </div>
      {renderListPage()}
      <div
        className={cx('paging-item', {
          disabled: page === totalPage,
        })}
      >
        <button type="button" onClick={() => onChangePage(page + 1)}>
          <span>
            <img src={images.icArrowRight} alt={'next'} />
          </span>
        </button>
      </div>
      {isShowGoToPage && (
        <form className={'control-page'}>
          <input
            placeholder={placeholder || 'Go to page'}
            type="number"
            value={numberPage}
            onChange={(e) => setNumberPage(e.target.value)}
            onKeyDown={(e) => {
              if (['e', '-', '.', ' '].includes(e.key)) {
                e.preventDefault();
              }
              if (e.key === 'Enter') {
                handleGoToPage(e);
              }
            }}
          />
          <button type="button" onClick={handleGoToPage}>
            {titleButton || 'Go'}
          </button>
        </form>
      )}
    </BasePagination>
  );
};

export default Pagination;
