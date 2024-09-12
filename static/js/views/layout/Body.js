import React from "react";
import Header from "./Header";
import { Helmet } from "react-helmet";
import AuthGuard from "../../helpers/AuthGuard";
import { Link } from "react-router-dom";

export function BodyLayout(props) {
  const isAuth = props.login ?? false;
  const pageTitle = props.pageTitle !== undefined ? props.pageTitle : "";
  const pageDesc = props.pageDesc !== undefined ? props.pageDesc : "";
  const pageIcon = props.pageIcon !== undefined ? props.pageIcon : false;
  const navTab = typeof props.tab === "object" ? props.tab : false;
  return (
    <AuthGuard login={isAuth}>
      <Helmet>
        <title>Stresser.su - {pageTitle}</title>
      </Helmet>
      <div className={isAuth ? "page" : "page-login"}>
        <div className="page-content">
          {isAuth && <Header />}
          <div className="content-area">
            <div className="animated-sections">
              <section className="animated-section">
                {isAuth && (
                  <div className="page-title">
                    <h2>
                      {pageIcon && <span className={"fa " + pageIcon} />}{" "}
                      {pageTitle}
                    </h2>
                    <p>{pageDesc}</p>
                    {navTab && (
                      <div className="tab">
                        {navTab.map((row, i) => {
                          return (
                            <Link
                              className={
                                "tablinks" +
                                (window.location.pathname === row.path
                                  ? " active"
                                  : "")
                              }
                              to={row.path}
                              key={i}
                            >
                              <span key={i} className={"fa " + row.icon} />{" "}
                              {row.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
                {props.children}
              </section>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
