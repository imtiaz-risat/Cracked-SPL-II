import React from 'react';
import { useTable } from 'react-table';

const ExamHistoryTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Exam Date',
        accessor: 'examDate', // accessor is the "key" in the data
      },
      {
        Header: 'Exam Type',
        accessor: 'type',
      },
      {
        Header: 'Subject',
        accessor: 'subject',
      },
      {
        Header: 'Obtained Scores',
        accessor: 'score',
      },
      {
        Header: 'Correct Answers',
        accessor: 'correct',
      },
      {
        Header: 'Incorrect Answers',
        accessor: 'incorrect',
      },
      {
        Header: 'Skipped',
        accessor: 'skipped',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className="min-w-full leading-normal">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-200"
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="hover:bg-gray-100">
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  className="px-5 py-5 border-b border-gray-200 bg-white text-sm hover:bg-gray-50"
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ExamHistoryTable;
