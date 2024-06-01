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
        accessor: "fullname",
        Cell: ({ value }) => (
          <div style={{ textAlign: "left", whiteSpace: "nowrap" }}>{value}</div>
        ),
      },
      {
        Header: "Points",
        accessor: "Point",
        Cell: ({ value }) => (
          <div style={{ textAlign: "right" }}>{value.toFixed(2)}</div>
        ),
      },
    ],
    []
  );

  const { getTableProps, rows, prepareRow } = useTable({ columns, data });

  return (
    <div {...getTableProps()} className="min-w-full">
      {rows.map((row, index) => {
        prepareRow(row);
        return (
          <div
            {...row.getRowProps()}
            className={`p-2 mb-2 flex justify-between rounded-border rounded-lg shadow-md ${
              index === 0
                ? "bg-amber-300"
                : index === 1
                ? "bg-cyan-300"
                : index === 2
                ? "bg-stone-300"
                : "bg-gray-50"
            }`}
          >
            {row.cells.map((cell, index) => {
              return (
                <div
                  {...cell.getCellProps()}
                  className={index === 1 ? "flex-1" : "flex-none"}
                  style={{
                    padding: "10px",
                    textAlign: cell.column.id === "Point" ? "right" : "left",
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
