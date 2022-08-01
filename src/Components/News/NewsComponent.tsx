import React from "react";
import { Link } from "react-router-dom";
import "./NewsComponent.style.scss";

export type NewsProps = {
  id: number;
  link: string;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
  visible?: boolean;

  getInfo: (itemId: number) => void;
};

export const NewsComponent = (props: NewsProps) => {
  const { id, link, title, content, created_at, updated_at, visible, getInfo } = props;

  return (
    <>
      <div className="news-wrapper">
        <div className="news" key={id} onClick={() => getInfo(id)}>
          <p className="news__date">{created_at}</p>
          <img className="news__image" src={link} />
          <div className="news__text">
            <h3 className="news__title">{title}</h3>
            <span className="news__content">{content}</span>
            <Link to={"/news/:id"} className="news__link">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
