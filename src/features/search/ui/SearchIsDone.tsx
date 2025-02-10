import { FC } from 'react';
import { VideosSection } from 'entities/videos/ui/VideosSection';
import { SearchIsDoneProps, useViewList } from '../model';

export const SearchIsDone: FC<SearchIsDoneProps> = ({ searchText, videos }) => {
  const { filterChoice, onClickGrid, onClickList } = useViewList();
  return (
    <>
      <div className="search__second-line">
        <div className="search__subtitle-block">
          <h2 className="search__subtitle">
            Видео по запросу «<span>{searchText}</span>»
          </h2>
          <h2>{videos?.pageInfo?.totalResults}</h2>
        </div>
        <div className="search__filter-options">
          <i
            className={
              filterChoice === 'videos__list-content'
                ? 'fa-solid fa-list fa-list_active'
                : 'fa-solid fa-list'
            }
            onClick={onClickList}
          ></i>
          <i
            className={
              filterChoice === 'videos__block-content'
                ? 'fa-solid fa-grip fa-grip_active'
                : 'fa-solid fa-grip'
            }
            onClick={onClickGrid}
          ></i>
        </div>
      </div>
      <VideosSection video={videos?.items} choice={filterChoice} />
    </>
  );
};
