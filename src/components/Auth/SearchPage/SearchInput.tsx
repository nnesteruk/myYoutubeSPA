import { GetProps, Input, Modal } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import { FC, useState } from 'react';
import { VideosSection } from './VideosSection';
import { FavoriteModal } from './FavoriteModal';

type SearchProps = GetProps<typeof Input.Search>;

export const SearchInput: FC = () => {
  const [video, setVideo] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [modalOpen, setModalOpen] = useState(true);
  const [filterChoice, setFilterChoice] = useState('videos__block-content');
  const youtubeApiUrl = import.meta.env.VITE_YOUTUBE_API_URL;
  const apiKey = import.meta.env.VITE_API_KEY;
  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    // console.log(info?.source, value);
    const {
      data: { items },
    } = await axios.get(
      `${youtubeApiUrl}/search?part=snippet&maxResults=50&q=${value}&key=${apiKey}
        `,
      // &order=viewCount&type=video&videoDefinition=high
      // console.log(response);
    );
    console.log(items);
    setSearchText(() => value);
    setVideo(() => items);
  };

  const width = video ? '100%' : '650px';
  const onClickList = () => {
    setFilterChoice(() => 'videos__list-content');
  };
  const onClickGrid = () => {
    setFilterChoice(() => 'videos__block-content');
  };
  console.log(filterChoice);
  const clickHeart = () => {
    console.log(modalOpen);
    setModalOpen(() => true);
  };

  return (
    <>
      <Search
        placeholder="Что хотите посмотреть?"
        enterButton="Найти"
        size="large"
        suffix={video && <i onClick={clickHeart} className="fa-regular fa-heart" />}
        className="main__search-input"
        style={{ width: width }}
        onSearch={onSearch}
      />
      {video && (
        <div className="search__second-line">
          <h2 className="search__subtitle">
            Видео по запросу «<span>{searchText}</span>»
          </h2>
          <div className="search__filter-options">
            <i
              className={
                filterChoice === 'videos__list-content'
                  ? 'fa-solid fa-list fa-list_active'
                  : 'fa-solid fa-list'
              }
              onClick={onClickList}></i>
            <i
              className={
                filterChoice === 'videos__block-content'
                  ? 'fa-solid fa-grip fa-grip_active'
                  : 'fa-solid fa-grip'
              }
              onClick={onClickGrid}></i>
          </div>
        </div>
      )}
      {modalOpen && <FavoriteModal open={modalOpen} text={searchText} />}
      <VideosSection searchText={searchText} video={video} choice={filterChoice} />
    </>
  );
};
