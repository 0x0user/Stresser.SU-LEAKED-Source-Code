import React from "react";
import { Link } from "react-router-dom";

export class Tab extends React.Component {
  render() {
    return (
      <li className="">
        <Link
          className={
            "nav-anim" +
            (window.location.pathname.includes(this.props.link)
              ? " active"
              : "")
          }
          to={this.props.link}
        >
          <span className={"menu-icon lnr " + this.props.icon} />
          {this.props.data !== undefined && this.props.data > 0 && (
            <span className="notify-badge-tab">{this.props.data}</span>
          )}
          <span className="link-text">{this.props.children}</span>
        </Link>
      </li>
    );
  }
}
