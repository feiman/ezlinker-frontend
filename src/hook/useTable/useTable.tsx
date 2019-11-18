import React, { useState } from 'react';
import Table, { TableProps, PaginationConfig } from 'antd/lib/table';
import { ParsedUrlQueryInput } from 'querystring';
import { IUseResuful } from '../useRestful/useRestful';
import { ITableList, ITableListItem } from '@/typings/server';
import useRestful from '@/hook/useRestful';

const paginationInitial = {
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showTotal: (total: number) => <span>共 {total} 条</span>,
};

function useTable<Resource>(
  columns: Array<Object>,
  resource: IUseResuful<any>,
  params: ParsedUrlQueryInput,
  options: any,
) {
  const [pagination, setPagination] = useState<PaginationConfig>(paginationInitial);
  const { data, error } = resource.query(params);
  const loading: boolean = !!data || (!!error);
  const result = data as ITableList<any>;

  const handleTableChange: TableProps<Resource>['onChange'] = (
    pagination,
    filters,
    sorter,
    ...rest
  ) => {
    setPagination(pagination);
  };

  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={data && result.records}
      rowKey={(record: ITableListItem) => record.id}
      pagination={pagination}
      onChange={handleTableChange}
      {...options}
    />
  );
}
export default useTable;

const resource = useRestful<any>('/api/xxx');
resource.query().data;