import React from 'react';
import { useTable } from 'react-table';
import './ExamHistoryTable.css'; // Ensure the CSS file is correctly imported

const ExamHistoryTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'SL NO',
        accessor: (row, rowIndex) => rowIndex + 1, // Calculate serial number based on row index
        id: 'serial', // Necessary to provide an id for accessor functions
        Cell: ({ value }) => <div className="serial-cell">{value}</div> // Use a custom cell component for styling
      },
      {
        Header: 'Exam Date',
        accessor: 'examStartTime',
        
      },
      {
        Header: 'Exam Type',
        accessor: 'type',
        
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
      {
        Header: 'Obtained Scores',
        accessor: 'score',
      }
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
                className={column.id === 'serial' ? 'serial-header' : 'px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className={index % 2 === 0 ? 'exam-row-even' : 'exam-row-odd'}>
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  className={cell.column.id === 'serial' ? 'serial-cell' : 'px-5 py-5 border-b border-gray-200 text-sm'}
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