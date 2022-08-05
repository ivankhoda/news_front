import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./NewsPost.style.scss";

import Pusher from "pusher-js";
import { NewsProps } from "../News/NewsComponent";
import { NewsPostComponent } from "./NewsPostComponent";

export const NewsPost = () => {
  const [newsPost, setNewsPost] = useState<NewsProps>();
  const { id } = useParams();
  const pusher = new Pusher(`${process.env.PUSHER_APPKEY}`, {
    cluster: "eu",
  });
  const channel = pusher.subscribe("posts-channel");
  useEffect(() => {
    let cleanupFunction = false;
    const getData = async () => {
      const getMessagesData = async (id: any) =>
        fetch(`${process.env.BASE_URL}/news/${id}`, {
          method: "GET",
        });
      const NewsPostDataResponse = await getMessagesData(id);
      const newsPostData = await NewsPostDataResponse.json();
      setNewsPost(newsPostData);
    };
    channel.bind("post-update", (data) => {
      getData();
    });

    getData();
    return () => {
      cleanupFunction = true;
    };
  }, []);

  return newsPost ? (
    <NewsPostComponent
      id={newsPost.id}
      title={newsPost.title}
      content={newsPost.content}
      link={newsPost.link}
      visible={newsPost.visible}
    />
  ) : null;
};
