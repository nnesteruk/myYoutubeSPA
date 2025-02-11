import { JSX } from 'react';
import { Video } from 'shared/types';
import './videosSection.scss';

export const VideoBlock = ({
  item,
  choice,
}: {
  item: Video;
  choice: string;
}): JSX.Element => {
  const { snippet, statistics } = item;
  return (
    <>
      <div
        className={
          choice == 'videos__list-content' ? 'videos__block2' : 'videos__block'
        }
      >
        <img
          src={snippet?.thumbnails?.medium?.url || ''}
          alt={snippet.title || 'Thumbnail'}
          className={
            choice == 'videos__list-content' ? 'videos__img2' : 'videos__img'
          }
        />
        <div
          className={
            choice == 'videos__list-content' ? 'videos__info-text' : ''
          }
        >
          <h3 className="videos__title">
            {snippet.title.length > 30
              ? `${snippet.title.slice(0, 31)}...`
              : snippet.title}
          </h3>
          <p className="videos__subtitle">{statistics.viewCount} просмотров</p>
        </div>
      </div>
    </>
  );
};
