import { GetProps, Input, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';
import { FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { FavoriteModal } from 'widgets/favorite_modal/ui/FavoriteModal';
import { openModal } from 'shared/model/modalSlice';
import { NavLink } from 'react-router';
import { FavoriteRequestParams } from 'components/type';
import { fetchGetVideos } from 'entities/videos/api/videosAction';
import { SearchIsDone } from './SearchIsDone';
import './search.scss';
import { useAppDispatch, useAppSelector } from 'shared/config';

export type SearchProps = GetProps<typeof Input.Search>;
export type SearchInputProps = {
  handleSearchSuccess: (state: boolean) => void; // Тип функции пропса
};

export const SearchInput: FC<SearchInputProps> = ({ handleSearchSuccess }) => {
  const { isModalOpen } = useAppSelector((state) => state.modal);
  const favoriteRequest: FavoriteRequestParams | null = JSON.parse(
    localStorage.getItem('favoriteRequest') || 'null',
  );
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState(favoriteRequest?.title ?? '');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [iconHeart, setIconHeart] = useState('fa-regular fa-heart');
  const [checkFunc, setCheckFunc] = useState(false);
  const { videos, error, isSuccess } = useAppSelector((state) => state.videos);
  const searchRef = useRef();

  const onSearch: SearchProps['onSearch'] = async () => {
    if (searchText) {
      dispatch(fetchGetVideos({ query: searchText }));
      setTooltipVisible(false);
      setIconHeart('fa-regular fa-heart');
    } else {
      alert('Введите запрос в поле ввода');
      console.log(searchRef.current);
      // searchRef.current.focus();
    }
  };

  const clickHeart = (): void => {
    dispatch(openModal());
  };
  const handleOnChange = (e: {
    target: { value: SetStateAction<string> };
  }): void => {
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
  }, [isSuccess, handleSearchSuccess]);

  useEffect(() => {
    if (searchText) {
      dispatch(
        fetchGetVideos({
          query: searchText,
          countResult: favoriteRequest?.maxCount,
          sortBy: favoriteRequest?.sortBy,
        }),
      );
    }
    localStorage.removeItem('favoriteRequest');
  }, []); // для сохраненного запроса

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
            // ref={searchRef}
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
