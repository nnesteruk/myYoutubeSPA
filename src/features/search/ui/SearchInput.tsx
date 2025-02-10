import { InputRef, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import { FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { FavoriteModal } from 'widgets/favorite_modal/ui/FavoriteModal';
import { openModal } from 'shared/model/modalSlice';
import { NavLink } from 'react-router';
import { fetchGetVideos } from 'entities/videos/api/videosAction';
import { SearchIsDone } from './SearchIsDone';
import './search.scss';
import { useAppDispatch, useAppSelector } from 'shared/config';
import {
  SearchInputProps,
  SearchProps,
  useFavoriteRequest,
  useTooltipVisibale,
} from '../model';

export const SearchInput: FC<SearchInputProps> = ({ handleSearchSuccess }) => {
  const { isModalOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const { videos, error, isSuccess } = useAppSelector((state) => state.videos);
  const { favoriteRequest, searchText, handleOnChange } = useFavoriteRequest();
  const {
    iconHeart,
    setIconHeart,
    tooltipVisible,
    setTooltipVisible,
    checkFunc,
  } = useTooltipVisibale(favoriteRequest);
  const searchRef = useRef<InputRef | null>(null);

  const onSearch: SearchProps['onSearch'] = async () => {
    if (searchText) {
      dispatch(fetchGetVideos({ query: searchText }));
      setTooltipVisible(false);
      setIconHeart('fa-regular fa-heart');
    } else {
      alert('Введите запрос в поле ввода');
      searchRef.current?.focus();
    }
  };

  const clickHeart = (): void => {
    dispatch(openModal());
  };

  useEffect(() => {
    isSuccess && handleSearchSuccess(isSuccess);
  }, [isSuccess, handleSearchSuccess]);

  return (
    <>
      {error ? (
        <h1>{'Что-то пошло не так :('}</h1>
      ) : (
        <>
          <Search
            placeholder="Что хотите посмотреть?"
            enterButton="Найти"
            size="large"
            defaultValue={searchText}
            ref={searchRef}
            suffix={
              videos && (
                <Tooltip
                  title={() => (
                    <div className="tooltip">
                      <p>Поиск сохранён в разделе «Избранное» </p>
                      <NavLink to="/favoritePage">Перейти в избранное</NavLink>
                    </div>
                  )}
                  color="white"
                  placement="bottom"
                  open={
                    iconHeart === 'fa-solid fa-heart' && checkFunc
                      ? undefined
                      : tooltipVisible
                  }
                >
                  <i
                    onClick={() =>
                      iconHeart == 'fa-regular fa-heart' && clickHeart()
                    }
                    className={iconHeart}
                  />
                </Tooltip>
              )
            }
            className={
              videos ? ' search-input search-input_full' : 'search-input'
            }
            onSearch={onSearch}
            onChange={handleOnChange}
          />
          {isSuccess && (
            <SearchIsDone searchText={searchText} videos={videos} />
          )}
          <FavoriteModal
            open={isModalOpen}
            text={searchText}
            checkModal={setTooltipVisible}
            queryId={videos?.queryId}
          />
        </>
      )}
    </>
  );
};
