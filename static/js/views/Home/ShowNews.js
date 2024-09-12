import React from "react";
import { data } from "../../helpers/View/ParseData";

function ShowNews({ items }) {
  return (
    <>
      <div className="timeline-scroll">
        {items &&
          items.map(({ id, title, content, created_at }) => (
            <div key={id} className="timeline-item">
              <div className="divider" />
              <div className="right-part">
                <h4 className="item-title">
                  {title}
                  <span className="item-date">
                    {data.dateformat(created_at)}
                  </span>
                </h4>
                <div
                  dangerouslySetInnerHTML={{
                    __html: content,
                  }}
                  className="content"
                ></div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default ShowNews;
