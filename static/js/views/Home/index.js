import React from "react";
import { BodyLayout } from "../layout/Body";
import Content from "./Content";
import { UserLocal } from "../../helpers/UserLocal";
import ShowHomeAction, { SHOW_HOME_VIEW } from "../../requests/Home";
import Renderer from "../../helpers/View/Renderer";
import { useTranslation } from "react-i18next";

const Home = () => {
  const username = UserLocal.get("username");

  const { t, i18n } = useTranslation("home");

  return (
    <BodyLayout
      login={true}
      pageTitle={i18n.t("header.tab.home")}
      pageDesc={t("description", { username: username })}
      pageIcon="fa-home"
    >
      <Renderer
        store={ShowHomeAction}
        element={Content}
        name={SHOW_HOME_VIEW}
        translate={{ t: t, i18n: i18n }}
      />
    </BodyLayout>
  );
};

export default Home;
