import Card from "./Card";
import { Scrollbars } from "react-custom-scrollbars-2";
import React from "react";

type TableContainerProps = {
  headers: string[];
  children: React.ReactNode;
};

export default function TableContainer({ headers, children }: TableContainerProps) {
  const renderThumb = ({ style, ...props }: any) => {
    const thumbStyle = {
      backgroundColor: "white",
      borderRadius: "15px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  const renderTrack = ({ style, ...props }: any) => {
    const trackStyle = {
      right: 0,
      bottom: 0,
      top: 0,
      width: "15px",
      borderRadius: "15px",
      backgroundColor: "rgba(255,255,255,0.2)",
    };
    return <div style={{ ...style, ...trackStyle }} {...props} />;
  };

  return (
    <Card>
      <div className="h-full flex flex-col">
        {/* テーブルヘッダー */}
        <table className="w-full text-left table-fixed">
          <thead>
            <tr className="border-b border-white/20 h-10">
              {headers.map((header, i) => (
                <th key={i}>{header}</th>
              ))}
            </tr>
          </thead>
        </table>

        {/* 本体スクロール部 */}
        <Scrollbars
          autoHide
          renderThumbVertical={renderThumb}
          renderTrackVertical={renderTrack}
        >
          <table className="w-full text-left table-fixed">
            <tbody>{children}</tbody>
          </table>
        </Scrollbars>
      </div>
    </Card>
  );
}
