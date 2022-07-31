import React from "react";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
import "../../style.scss";
import { Blanc } from "../blanc/Blanc";
import { NewsPost } from "../Dialog/NewsPost";
import { Header } from "../Header/Header";

import { NewsContainer } from "../News/NewsContainer";

import { Sidebar } from "../Sidebar/Sidebar";
import { WorkingPanel } from "../WorkingPanel/WorkingPanel";
import "./App.style.scss";

export const App = () => {
  const routes = [
    { path: "/", name: "Main", Component: <Blanc /> },
    { path: "/news", name: "News", Component: <NewsContainer /> },
    { path: "/news/news/:id", name: "NewsPost", Component: <NewsPost /> },
    { path: "/assignees", name: "Assignees", Component: <Blanc /> },
    { path: "/categories", name: "Categories", Component: <Blanc /> },
    { path: "/services", name: "Services", Component: <Blanc /> },
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
