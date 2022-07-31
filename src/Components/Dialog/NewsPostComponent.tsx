import React from "react";
import "./NewsPost.style.scss";

type NewsPostProps = {
  id: number;
  title: string;
  content: string;
  link: string;
  visible?: boolean;
};

export const NewsPostComponent = (props: NewsPostProps) => {
  const { id, title, content, link, visible } = props;

  return visible ? (
    <div key={id} className="news-post">
      <img alt="image" src={link} className="news-post__image" />
      <h2 className="news-post__title"> {title}</h2>
      <p className="news-post__content">{content}</p>
    </div>
  ) : (
    <div>Sorry, content is unavailiable now</div>
  );
};
