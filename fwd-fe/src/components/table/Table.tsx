import React, { FC, ReactNode, useCallback } from 'react';
import cx from 'classnames';
import MuiTable, { TableProps } from '@material-ui/core/Table';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';
import CommonImage from 'assets/images/common/ImageCommon';
import { CircularProgress } from '@material-ui/core';

import { Color } from 'constants/style.const';
import useStyles, { TableHeadCell, TableCell } from './table.styles';

export interface Column {
  title: string;
  dataKey: string;
  width?: number | string;
  render?: (value: any) => ReactNode;
  className?: string;
}

export interface Data {
  key: string;
  [property: string]: any;
}

interface Props extends TableProps {
  className?: string;
  dataSource?: Array<Data>;
  columns?: Column[];
  renderRow?: (
    data: Data,
    columns: Column[],
    index: number,
  ) => ReactNode | React.ReactElement;
  noDataOptions?: {
    component?: ReactNode | React.ReactElement;
    message?: string;
    className?: string;
  };
  loadingOptions?: {
    component?: ReactNode | React.ReactElement;
    message?: string;
    className?: string;
  };
  isLoading?: boolean;
}

const Table: FC<Props> = ({
  children,
  className,
  dataSource,
  columns,
  renderRow,
  noDataOptions,
  loadingOptions,
  isLoading,
  ...props
}) => {
  const classes = useStyles();

  const defaultRenderRow = useCallback(
    (data: Data) => {
      return (
        <MuiTableRow key={data.key}>
          {columns?.map((column) => (
            <TableCell key={`${data.key}-${column.dataKey}`}>
              {column?.render?.(data[column?.dataKey]) || data[column?.dataKey]}
            </TableCell>
          ))}
        </MuiTableRow>
      );
    },
    [columns],
  );

  return (
    <div className={classes.tableContainer}>
      <MuiTable className={cx(classes.table, className)} {...props}>
        {children || (
          <MuiTable>
            <MuiTableHead>
              <MuiTableRow>
                {columns?.map((column) => (
                  <TableHeadCell
                    className={column.className}
                    key={column.dataKey}
                    style={{ width: column.width }}
                  >
                    {column.title}
                  </TableHeadCell>
                ))}
              </MuiTableRow>
            </MuiTableHead>
            <MuiTableBody>
              {isLoading ? (
                <MuiTableRow>
                  <MuiTableCell colSpan={columns?.length || 0}>
                    {loadingOptions?.component ? (
                      loadingOptions?.component
                    ) : (
                      <div
                        className={cx(
                          classes.loadingContainer,
                          loadingOptions?.className,
                        )}
                      >
                        <span style={{ color: Color.PRIMARY }}>
                          <CircularProgress color={'inherit'} />
                        </span>
                        <span>{loadingOptions?.message || 'Loading...'}</span>
                      </div>
                    )}
                  </MuiTableCell>
                </MuiTableRow>
              ) : (
                <>
                  {dataSource && dataSource?.length > 0 ? (
                    dataSource?.map((data, index) =>
                      renderRow
                        ? renderRow(data, columns, index)
                        : defaultRenderRow(data),
                    )
                  ) : (
                    <MuiTableRow>
                      <MuiTableCell colSpan={columns?.length || 0}>
                        {noDataOptions?.component ? (
                          noDataOptions?.component
                        ) : (
                          <div
                            className={cx(
                              classes.noDataContainer,
                              noDataOptions?.className,
                            )}
                          >
                            <img src={CommonImage.icEmptyTray} alt="" />
                            <span>{noDataOptions?.message || 'No Data'}</span>
                          </div>
                        )}
                      </MuiTableCell>
                    </MuiTableRow>
                  )}
                </>
              )}
            </MuiTableBody>
          </MuiTable>
        )}
      </MuiTable>
    </div>
  );
};

export default Table;
