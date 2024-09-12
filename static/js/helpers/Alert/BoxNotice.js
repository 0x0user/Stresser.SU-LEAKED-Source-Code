import React from "react";
import { Link } from "react-router-dom";

const BoxNotice = ({ ...props }) => {
  return (
    <div className={"row" + (props.fadeIn ? " fadein" : "")}>
      <div className="col-xs-12 col-xl-12">
        <div className="card box-notice-content">
          <div className="card-body">
            <div className="row align-items-center box-notice">
              {props.icon !== undefined && (
                <div className="col-auto">
                  <span
                    className={`menu-icon lnr ${props.icon.name}`}
                    style={{ fontSize: "3rem", color: props.icon.color ?? "#fffc5e" }}
                  ></span>
                </div>
              )}
              <div className="col">{props.children}</div>
              {props.button !== undefined && (
                <div className="col-auto">
                  <Link to={props.button.link} className="btn btn-confirm">
                    {props.button.icon !== undefined && (
                      <span className={`fa ${props.button.icon}`}></span>
                    )}{" "}
                    {props.button.label}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxNotice;
