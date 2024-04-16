import React from "react";
import { useTable } from "react-table";

export default function LeaderboardTable({ data = [] }) {
  const columns = React.useMemo(
    () => [
      {
        Header: "Sl No",
        accessor: "slNo",
        Cell: ({ value }) => <div style={{ textAlign: "left" }}>{value}</div>,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => (
          <div style={{ textAlign: "left", whiteSpace: "nowrap" }}>{value}</div>
        ),
      },
      {
        Header: "Points",
        accessor: "points",
        Cell: ({ value }) => <div style={{ textAlign: "right" }}>{value}</div>,
      },
    ],
    []
  );

  const { getTableProps, rows, prepareRow } = useTable({ columns, data });

  return (
    <div {...getTableProps()} className="w-full">
      {rows.map((row) => {
        prepareRow(row);
        return (
          <div
            {...row.getRowProps()}
            className="bg-gray-50 hover:bg-gray-200 w-full rounded-border rounded-lg shadow-md p-2 mb-2 flex justify-between"
          >
            {row.cells.map((cell, index) => {
              return (
                <div
                  {...cell.getCellProps()}
                  className={index === 1 ? "flex-1" : "flex-none"}
                  style={{
                    padding: "10px 100px 10px 10px",
                    textAlign: cell.column.id === "points" ? "right" : "left",
                  }}
                >
                  {cell.render("Cell")}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
