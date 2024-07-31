import { v4 as uuid } from 'uuid';

export const validateTableData = (tableData: any[]) => {
  if (!Array.isArray(tableData)) {
    console.error('tableData is not an array', tableData);
    return;
  }
  return true;
};

export const addItemToEditTable = (
  item: any = {},
  tableData: any[],
  isBefore: boolean = false,
  isEditing: boolean = true,
) => {
  if (!validateTableData(tableData)) return tableData;
  const list: any[] = tableData.map((v: any) => ({
    ...v,
    isEditing: false,
    isChecked: true,
  }));
  item = {
    id: uuid(),
    isNew: true,
    isEditing,
    ...item,
  };
  return isBefore ? [item, ...list] : [...list, item];
};

export const updateEditTableItemByKey = (id: string, item: any, tableData: any[]) => {
  if (!validateTableData(tableData)) return tableData;
  console.log('=>(utils.ts:40) id', id);
  console.log('=>(utils.ts:40) item', item);

  const props = { isEditing: false, isChecked: false };
  console.log(
    '=>(utils.ts:43) tableData',
    tableData.map((v: any) => (v.id === id ? { ...v, ...item, ...props } : { ...v, ...props })),
  );

  return tableData.map((v: any) =>
    v.id === id ? { ...v, ...item, ...props } : { ...v, ...props },
  );
};

export const editTableItemOnEdit = (id: string, tableData: any[]) => {
  if (!validateTableData(tableData)) return tableData;
  return tableData.map((v: any) =>
    v.id === id ? { ...v, isEditing: true } : { ...v, isChecked: true },
  );
};

export const editTableItemOnCancel = (id: string, tableData: any[]) => {
  if (!validateTableData(tableData)) return tableData;
  return tableData.map((v: any) => ({
    ...v,
    isEditing: false,
    isChecked: false,
  }));
};

export const deleteTableItemOnDelete = (id: string, tableData: any[]) => {
  if (!validateTableData(tableData)) return tableData;
  return tableData.filter((v: any) => v.id !== id);
};

export const getDiffEditTableItem = (tableData: any[], selectedRowKeys?: any[]) => {
  let tableItems: any[] = tableData;
  if (Array.isArray(selectedRowKeys)) {
    tableItems = tableData.filter((v: any) => selectedRowKeys.includes(v.id));
  }
  const newItems = tableItems.filter((v: any) => v.isNew);
  const selectedItems = tableItems.filter((v: any) => !v.isNew);
  const diffEditItems = tableItems.filter((v: any) => v.isDiff && !v.isNew);
  return { newItems, diffEditItems, selectedItems };
};
