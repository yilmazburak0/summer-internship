import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Input, Select } from 'antd';
import 'moment/locale/tr';
import locale from 'antd/es/date-picker/locale/tr_TR';
import React, { useContext, useEffect, useState } from 'react';

const { RangePicker } = DatePicker;

let timeoutId;

export default function Search({ companyEnabled, dateField, onChange, disabled, statusOptions }) {
  const [companyId, setCompanyId] = useState();
  const [status, setStatus] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchTextLast, setSearchTextLast] = useState('');
  const [dates, setDates] = useState([]);



  useEffect(() => {
    //if (companyEnabled) fetchCompanyNames();
  }, [companyEnabled]); //eslint-disable-line

  useEffect(() => {
    sendChange();
  }, [companyId, searchTextLast, dates, status]); //eslint-disable-line

  const sendChange = () => {
    const filter = { fields: [] };

    if (searchText) filter.searchText = searchTextLast;
    if (companyId)
      filter.fields.push({ condition: 'equal', value: companyId, dataField: 'companyId' });
    if (dateField && dates?.[0])
      filter.fields.push({
        condition: 'greater_than',
        value: dates[0].toDate(),
        dataField: dateField,
      });
    if (dateField && dates?.[1])
      filter.fields.push({
        condition: 'less_than',
        value: dates[1].toDate(),
        dataField: dateField,
      });
    if (status) filter.fields.push({ condition: 'equal', value: status, dataField: 'status' });
    if (onChange) onChange(filter);
  };

  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '16px' }}>
          <Input
            disabled={disabled}
            allowClear
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              clearTimeout(timeoutId);
              timeoutId = setTimeout(() => setSearchTextLast(e.target.value), 500);
            }}
            placeholder='Arama yapabilirsiniz'
            suffix={<SearchOutlined style={{ color: 'rgba(0,0,0,.45)' }} />}
          />
        </div>
        {companyEnabled && (
          <div style={{ marginRight: '16px' }}>
            <Select
              disabled={disabled}
              style={{ width: 200 }}
              value={companyId}
              onChange={(value) => setCompanyId(value)}
              options={companyNames?.map((el) => ({ label: el.name, value: el._id, key: el._id }))}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              placeholder='Firma Seçebilirsiniz'
              allowClear
              showSearch
            />
          </div>
        )}
        {statusOptions && (
          <div style={{ marginRight: '16px' }}>
            <Select
              disabled={disabled}
              style={{ width: 200 }}
              value={status}
              onChange={(value) => setStatus(value)}
              options={statusOptions?.map((el) => ({
                label: el.text,
                value: el.value,
                key: el.value,
              }))}
              placeholder='Durum Seçebilirsiniz'
              allowClear
            />
          </div>
        )}
        {dateField && (
          <div style={{ marginRight: '16px' }}>
            <RangePicker
              disabled={disabled}
              locale={locale}
              value={dates}
              onChange={(value) => setDates(value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
