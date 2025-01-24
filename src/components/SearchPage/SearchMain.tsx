import { GetProps, Input, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import { FC, SetStateAction, useEffect, useState } from 'react';
import { VideosSection } from './VideosSection';
import { FavoriteModal } from '../Modal/FavoriteModal';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { openModal } from '../../redux/slices/modalSlice';
import { useLazyGetVideosQuery } from '../../redux/services/fetchYoutubeApi';
import { NavLink } from 'react-router';
import { VideoSearchParams } from '../type';

export type SearchProps = GetProps<typeof Input.Search>;
export type SearchInputProps = {
  handleSearchSuccess: (state: boolean) => void; // Тип функции пропса
};

export const SearchMain: FC<SearchInputProps> = ({ handleSearchSuccess }) => {
  const { isModalOpen } = useAppSelector((state) => state.modal);
  const favoriteRequest: VideoSearchParams | null = JSON.parse(
    localStorage.getItem('favoriteRequest') || 'null',
  );
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState(favoriteRequest?.searchText ?? '');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [filterChoice, setFilterChoice] = useState('videos__list-content');
  const [iconHeart, setIconHeart] = useState('fa-regular fa-heart');
  const [checkFunc, setCheckFunc] = useState(false);
  const [triggerGetVideos, { data, isSuccess, isError }] = useLazyGetVideosQuery();

  const onSearch: SearchProps['onSearch'] = async () => {
    triggerGetVideos({ searchText });
    setTooltipVisible(false);
    setIconHeart('fa-regular fa-heart');
  };

  const onClickList = (): void => {
    setFilterChoice(() => 'videos__list-content');
  };
  const onClickGrid = (): void => {
    setFilterChoice(() => 'videos__block-content');
  };

  const clickHeart = (): void => {
    dispatch(openModal());
  };
  const handleOnChange = (e: { target: { value: SetStateAction<string> } }): void => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (tooltipVisible || favoriteRequest) {
      setIconHeart('fa-solid fa-heart'); // Меняем иконку на "заполненное сердце"

      // Убираем тултип через 2 секунды
      setTimeout(() => {
        setTooltipVisible(false); // Прячем тултип
        setCheckFunc(true);
      }, 2000);
    }
  }, [tooltipVisible]);

  useEffect(() => {
    isSuccess && handleSearchSuccess(isSuccess);
  }, [data, isSuccess, handleSearchSuccess]);

  useEffect(() => {
    if (searchText) {
      triggerGetVideos({
        searchText,
        count: favoriteRequest?.count,
        sort: favoriteRequest?.sort,
      });

      localStorage.removeItem('favoriteRequest');
    }
  }, [favoriteRequest]); // для сохраненного запроса
  return (
    <>
      {isError ? (
        <h1>{'Что-то пошло не так :('}</h1>
      ) : (
        <>
          <Search
            placeholder="Что хотите посмотреть?"
            enterButton="Найти"
            size="large"
            defaultValue={searchText}
            suffix={
              isSuccess && (
                <Tooltip
                  title={() => (
                    <div style={{ backgroundColor: 'white', color: 'black' }}>
                      <p>Поиск сохранён в разделе «Избранное» </p>
                      <NavLink
                        to="/favoritePage"
                        style={{ color: '#1677ff', textDecoration: 'underline' }}>
                        Перейти в избранное
                      </NavLink>
                    </div>
                  )}
                  color="white"
                  placement="bottom"
                  style={{ color: 'red', backgroundColor: 'black' }}
                  open={
                    iconHeart === 'fa-solid fa-heart' && checkFunc ? undefined : tooltipVisible
                  }>
                  <i
                    onClick={() => iconHeart == 'fa-regular fa-heart' && clickHeart()}
                    className={iconHeart}
                  />
                </Tooltip>
              )
            }
            className="main__search-input"
            style={{ width: isSuccess ? '100%' : '650px' }}
            onSearch={onSearch}
            onChange={handleOnChange}
          />
          {isSuccess && (
            <div className="search__second-line">
              <h2 className="search__subtitle">
                Видео по запросу «<span>{searchText}</span>»
              </h2>
              <h2>{data?.pageInfo.totalResults}</h2>
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
          <VideosSection video={data?.items} choice={filterChoice} />
          <FavoriteModal open={isModalOpen} text={searchText} checkModal={setTooltipVisible} />
        </>
      )}
    </>
  );
};
