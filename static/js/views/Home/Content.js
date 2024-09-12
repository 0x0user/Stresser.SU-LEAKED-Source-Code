import { data } from "../../helpers/View/ParseData";
import Pagination from "../../helpers/View/Pagination";
import ShowNews from "./ShowNews";
import React from "react";

export default function Content({ items, translate }) {
  return (
    <div className="section-content">
      <div className="row">
        <div className="col-xl-8">
          <div className="block-title">
            <h3 dangerouslySetInnerHTML={{ __html: translate.t("news") }}></h3>
          </div>
          <div className="timeline timeline-second-style clearfix">
            <Pagination
              itemsPerPage={5}
              items={items.response.news}
              render={<ShowNews />}
            />
          </div>
        </div>
        <div className="white-space-50" />
        <div className="col-xl-4">
          <div className="block-title">
            <h3
              dangerouslySetInnerHTML={{ __html: translate.t("overview") }}
            ></h3>
          </div>
          <div className="col-xl-12">
            <div className="statswrap">
              <div>
                <div className="iconwrap">
                  <span className="fa fa-file" />
                </div>
                <div className="inner">
                  <span className="label">{translate.t("plan.name")}</span>
                  <span className="value">{items.response.plan.name}</span>
                </div>
              </div>
              <div>
                <div className="iconwrap">
                  <span className="fa fa-calendar" />
                </div>
                <div className="inner">
                  <span className="label">{translate.t("plan.expire")}</span>
                  <span className="value">
                    {items.response.plan.expire_at === "n/a"
                      ? items.response.plan.expire_at
                      : data.dateformat(items.response.plan.expire_at)}
                  </span>
                </div>
              </div>
              <div>
                <div className="iconwrap">
                  <span className="fa fa-clock" />
                </div>
                <div className="inner">
                  <span className="label">{translate.t("plan.time")}</span>
                  <span className="value">{items.response.plan.maxtime}</span>
                </div>
              </div>
              <div>
                <div className="iconwrap">
                  <span className="fa fa-rocket" />
                </div>
                <div className="inner">
                  <span className="label">{translate.t("plan.slots")}</span>
                  <span className="value">{items.response.plan.slots}</span>
                </div>
              </div>
              <div>
                <div className="iconwrap">
                  <span className="fa fa-code" />
                </div>
                <div className="inner">
                  <span className="label">API</span>
                  <span className="value">
                    {data.bool(items.response.plan.api)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
