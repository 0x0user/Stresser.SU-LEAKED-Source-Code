import { Tab } from "./navigation/Tab.js";
import Logo from "../../assets/media/logo.png";
import TelegramIcon from "../../assets/media/telegram-2-24.png";
import React, { useState, useEffect } from "react";
import { UserLocal } from "../../helpers/UserLocal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import LogoutAction, { LOGOUT_ACTION } from "../../requests/Auth/Logout.js";
import Notif from "../../helpers/Alert/Notif.js";
import { SUBMIT_REQUEST_CLEAN_STATE } from "../../store/SubmitRequest/types.js";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Language from "../../helpers/View/Language.js";
import { TELEGRAM_LINKS } from "./TelegramLink.js";
import ShowUserAnsweredTicketAction from "../../requests/Support/ShowAnswered.js";
import { SHOW_NOTIF_CLEAN_STATE } from "../../store/NotificationRequestLoad/types.js";
import { MIRROR_LINK } from "./MirrorLink.js";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [support, setSupport] = useState(0);

  const { i18n } = useTranslation();

  const submit = useSelector((state) => state.submit);
  const notif = useSelector((state) => state.notif);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTelegramLink =
    TELEGRAM_LINKS[Math.floor(Math.random() * TELEGRAM_LINKS.length)];

  const triggerToogle = () => (!toggle ? setToggle(true) : setToggle(false));

  const handleLogout = () => {
    dispatch(LogoutAction());
  };

  useEffect(() => {
    if (!submit.submitted || !submit.response || submit.name !== LOGOUT_ACTION)
      return;
    if (submit.response.success) {
      Notif({ success: true, response: i18n.t("logout") });
      UserLocal.logout();
      setTimeout(function () {
        window.location.replace("/login");
      }, 1000);
    }
    dispatch({ type: SUBMIT_REQUEST_CLEAN_STATE });
  }, [submit, navigate, dispatch]);
  
  useEffect(() => {
    if (notif.loaded) return;
    dispatch(ShowUserAnsweredTicketAction());
  }, [notif, dispatch]);

  useEffect(() => {
    if (!notif.data || !notif.loaded) return;
    setSupport(notif.data.response.ticket_answered);
  }, [notif]);

  useEffect(() => {
    if(notif.loaded && !notif.data) return;
    let refreshSupport = setInterval(() => {
      dispatch({ type: SHOW_NOTIF_CLEAN_STATE });
    }, 300000);
    return () => {
      clearInterval(refreshSupport);
    };
  }, [dispatch, notif]);

  return (
    <>
      <header
        id="site_header"
        className={"header " + (toggle ? "animate" : "mobile-menu-hide")}
      >
        <div className="header-content">
          <div className="header-photo">
            <img src={Logo} alt={UserLocal.get("username")} />
          </div>
          <div className="header-titles">
            <h2>Stresser.su</h2>
          </div>
        </div>
        <ul className="main-menu">
          <Tab link="/home" icon="lnr-home">
            {i18n.t("header.tab.home")}
          </Tab>
          <Tab link="/hub" icon="lnr-rocket">
            {i18n.t("header.tab.hub")}
          </Tab>
          <Tab link="/upgrade" icon="lnr-cart">
            {i18n.t("header.btn.upgrade")}
          </Tab>
          <Tab link="/api-manager" icon="lnr-code">
            {i18n.t("header.tab.api")}
          </Tab>
          <Tab link="/support" icon="lnr-bubble" data={support}>
            {i18n.t("header.tab.support")}
          </Tab>
          <li className="telegram-tab">
            <a href={getTelegramLink} target="_blank" className="nav-anim">
              <img src={TelegramIcon} alt="telegram" />
            </a>
          </li>
        </ul>
        <div className="mt-2 header-info">
          <Link className="btn btn-confirm btn-block" to="/upgrade">
            <span className="fa fa-shopping-cart" />{" "}
            {i18n.t("header.btn.upgrade")}
          </Link>
          <Link
            className="btn btn-primary btn-block"
            to={getTelegramLink}
            target="_blank"
          >
            <span className="fa fa-paper-plane" />{" "}
            {i18n.t("header.btn.telegram")}
          </Link>
		  <Link
            className="btn btn-primary btn-block"
            to={MIRROR_LINK}
            target="_blank"
          >
            <span className="fa fa-network-wired" />{" "}
            {i18n.t("header.mirror")}
          </Link>
        </div>
        <div className="title-bar">
          <span className="text-white">{i18n.t("header.language")}</span>
        </div>
        <Language i18n={i18n} />
        <div className="mt-3 header-info">
          <div className="row">
            <div className="col-xs-12 col-xl-6">
              <Link className="btn btn-primary btn-block" to="/profile">
                <span className="fa fa-cog" /> {i18n.t("header.btn.settings")}
              </Link>
            </div>
            <div className="col-xs-12 col-xl-6">
              <button
                type="submit"
                className="btn btn-danger btn-block"
                onClick={handleLogout}
              >
                <span className="fa fa-sign-out-alt" />{" "}
                {i18n.t("header.btn.logout")}
              </button>
            </div>
          </div>
        </div>
        <div className="copyrights">
          {i18n.t("header.copyright", { year: new Date().getFullYear() })}
        </div>
      </header>
      <div
        className={"menu-toggle " + (toggle ? "open" : "")}
        onClick={triggerToogle}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
}
