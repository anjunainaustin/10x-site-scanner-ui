import React, { useState, useEffect, useContext } from 'react';
import Pagination from './pagination';
import ScanTable from './scan-table';
import QueryForm from './query-form';
import { API_BASE_URL } from '../constants';
import QueryProvider, { QueryContext } from './query-provider';

const Scan = ({ filters, scanType, columns }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scanData, setScanData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [scanDate, setScanDate] = useState();
  const defaultQuery = useContext(QueryContext);

  const [queryParams, setQueryParams] = useState(defaultQuery);

  const extractSelectedColumns = columns => queryObj => {
    return Object.keys(columns).map(c => queryObj[c] || queryObj.data[c]);
  };

  const formatQueryString = queryParams => {
    return Object.entries(queryParams)
      .map(entry => entry.join('='))
      .join('&')
      .replace(/=$|=(&)/g, '=*$1') //Replace empty string with a wildcard
      .replace(/scanPageType=(\/[^&]*)+/, 'data.$1=200') //replace dummy key with the real deal
      .replace(/\//g, '%2F');
  };

  const queryString = formatQueryString(queryParams);

  const queryBaseUrl = scanDate
    ? `${API_BASE_URL}date/${scanDate}/`
    : API_BASE_URL;

  const fetchScanData = async () => {
    console.log(`${queryBaseUrl}scans/${scanType}/?${queryString}`);
    const req = new Request(
      `${queryBaseUrl}scans/${scanType}/?${queryString}`,
      {
        method: 'GET',
      }
    );
    const resp = await fetch(req);
    const json = await resp.json();

    setScanData({
      count: json.count,
      results: json.results.map(extractSelectedColumns(columns)),
    });
    setIsLoading(false);
  };

  const csvUrl = `${queryBaseUrl}scans/${scanType}/csv/?${queryString}`.replace(
    /page=\d+&/,
    ''
  );

  const handlePageNav = newPageNumber => {
    setCurrentPage(newPageNumber);
  };

  const handleScanDateChange = newDate => {
    setScanDate(newDate);
  };

  const handleFilterQuery = newQuery => {
    setCurrentPage(1);

    if (newQuery.scanDate) {
      handleScanDateChange(newQuery.scanDate);
    } else {
      setQueryParams({ ...queryParams, ...newQuery });
    }
  };

  /*** Effects ***********************/
  useEffect(() => {
    fetchScanData();
  }, [currentPage, queryParams, scanDate]);

  return isLoading ? (
    <p>Loading…</p>
  ) : (
    <QueryProvider scanType={scanType}>
      <QueryForm
        filters={filters}
        handleFilterQuery={handleFilterQuery}
        handleScanDateChange={handleScanDateChange}
        queryParams={queryParams}
        scanType={scanType}
        defaultQuery={defaultQuery}
        csvUrl={csvUrl}
      />
      <Pagination
        currentPage={currentPage}
        handlePageNav={handlePageNav}
        recordCount={scanData.count}
        handleFilterQuery={handleFilterQuery}
      />
      <ScanTable
        scanType={scanType}
        scanData={scanData.results}
        columns={columns}
      />
    </QueryProvider>
  );
};

export default Scan;
