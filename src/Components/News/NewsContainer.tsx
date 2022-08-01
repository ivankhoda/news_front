import { DatePicker, Space } from "antd";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";
import "react-paginate";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { NewsComponent, NewsProps } from "./NewsComponent";
import "./NewsContainer.style.scss";

export const NewsContainer = () => {
  const [news, setNews] = useState<NewsProps[]>([]);
  const [range, setRange] = useState<{ dateFrom: number | Date | undefined; dateTo: number | Date | undefined }>({
    dateFrom: undefined,
    dateTo: undefined,
  });

  const navigate = useNavigate();
  const pusher = new Pusher(`${process.env.PUSHER_APPKEY}`, {
    cluster: "eu",
  });
  const channel = pusher.subscribe("posts-channel");

  const conversationPerPage = 10;
  const [pageNumber, setPageNumber] = useState(0);
  const pagesVisited = pageNumber * conversationPerPage;

  const pageCount = Math.ceil(news.length / conversationPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const { RangePicker } = DatePicker;

  useEffect(() => {
    let cleanupFunction = false;
    const query = range.dateFrom && range.dateTo ? `/news?from=${range.dateFrom}&to=${range.dateTo}` : "/news?";
    const getData = async () => {
      const newsData = await fetch(`${process.env.BASE_URL}/news?from=${query}`, {
        method: "GET",
      });
      const newsDataResponse = await newsData.json();

      setNews(newsDataResponse.data);
    };
    channel.bind("new-post", (data) => {
      getData();
    });
    channel.bind("post-update", (data) => {
      getData();
    });
    channel.bind("post-delete", (data) => {
      getData();
    });
    getData();

    return () => {
      cleanupFunction = true;
    };
  }, [range]);

  const onClick = async (item: NewsProps) => {
    navigate(`news/${item.id}`);
  };
  const onRangeSelect = (range: any) => {
    const dateFrom = new Date(range[0]._d);
    const dateTo = new Date(range[1]._d);

    setRange({ dateFrom, dateTo });
  };

  const displayNews = news.slice(pagesVisited, pagesVisited + conversationPerPage).map((news) => {
    return news.visible === true ? (
      <NewsComponent
        key={news.id}
        title={news.title}
        link={news.link}
        id={news.id}
        getInfo={() => onClick(news)}
        created_at={news.created_at}
        content={news.content}
      />
    ) : null;
  });

  return (
    <>
      <div className="news-container">
        <Space direction="vertical" size={12}>
          <RangePicker showTime onChange={(range) => onRangeSelect(range)} />
        </Space>
        <ul>{displayNews}</ul>
        <ReactPaginate
          className="news-paginate"
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
};
