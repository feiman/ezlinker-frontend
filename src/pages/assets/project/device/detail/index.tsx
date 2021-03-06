import React from 'react';
import ProTable from '@ant-design/pro-table';
import { get } from 'lodash';
import { useAsync } from '@umijs/hooks';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { createUseRestful } from '@/hooks';
import { DEVICES_DATA_API } from '@/services/resources/index';
import { tableData2ProTableAdapter } from '@/utils/adapter';
import { queryDataStructureByDeviceId } from '@/services/device';

interface IResult {
  parameter: any[];
  modules: any[];
}

const structure2columnsAdapter = (data: IResult | undefined) => {
  const baseField = [
    { title: '时间', dataIndex: 'createTime', key: 'createTime', render: (text: string) => text },
    { title: '操作', render: () => <a>操作</a> },
  ];
  if (!data) {
    return {
      device: baseField,
      modules: baseField,
    };
  }
  const device = data.parameter
    .map((item: any) => ({
      title: item.description,
      dataIndex: `data.${item.field}`,
      key: item.field,
      render: (field: any) => JSON.stringify(field),
    }))
    .concat(baseField as any);

  const modules = data.modules.map((item: any) => ({
    name: item.module,
    columns: item.structure
      .map((it: any) => ({
        title: it.description,
        dataIndex: `data.${it.field}`,
        key: it.field,
        render: (field: any) => JSON.stringify(field),
      }))
      .concat(baseField),
  }));

  return {
    device,
    modules,
  };
};

const getModules = (data: IResult | undefined) => {
  if (!data) return [];
  return data.modules.map((item: any) => ({ tab: item.name, path: `module/${item.field}` }));
};

const DeviceDetail = (props: any) => {
  const did = get(props, 'match.params.did');
  const { data: deviceDataStructure } = useAsync<any>(() => queryDataStructureByDeviceId(did));
  const deviceDataResource = createUseRestful<any>(DEVICES_DATA_API);

  const columns = structure2columnsAdapter(deviceDataStructure);
  const modules = getModules(deviceDataStructure);

  const headerTabList = [
    {
      tab: '设备数据',
      path: 'module/master',
    },
  ].concat(modules);

  return (
    <PageHeaderWrapper tabList={headerTabList}>
      <ProTable
        headerTitle="设备数据"
        rowKey="key"
        columns={(columns.device || []) as any}
        request={params =>
          deviceDataResource.query({ ...params, did }).then(data => tableData2ProTableAdapter(data))
        }
      ></ProTable>
    </PageHeaderWrapper>
  );
};

export default DeviceDetail;
