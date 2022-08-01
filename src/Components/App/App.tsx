import React from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import "../../style.scss";
import { Header } from "../Header/Header";
import { NewsPost } from "../NewsPost/NewsPost";

import { NewsContainer } from "../News/NewsContainer";

import { Main } from "../Main/Main";
import { NotFound } from "../NotFound/NotFoundPage";
import { Sidebar } from "../Sidebar/Sidebar";
import { WorkingPanel } from "../WorkingPanel/WorkingPanel";
import "./App.style.scss";

export const App = () => {
  const routes = [
    { path: "/", name: "Main", Component: <Main /> },
    { path: "/news", name: "News", Component: <NewsContainer /> },
    { path: "/news/news/:id", name: "NewsPost", Component: <NewsPost /> },
    { path: "/*", name: "NotFound", Component: <NotFound /> },
  ];

  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Sidebar />
        <WorkingPanel>
          <Routes>
            {routes.map(({ path, Component }) => (
              <Route key={path} path={path} element={Component} />
            ))}
          </Routes>
        </WorkingPanel>
      </HashRouter>
    </div>
  );
};
