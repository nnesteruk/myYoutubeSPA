import { FC } from 'react';

type VideosSectionProps = {
  video: [];
  choice: string;
};

type VideoRequestParams = {
  etag: string;
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      [key: string]: {
        url: string;
      };
    };
  };
};
export const VideosSection: FC<VideosSectionProps> = ({ video, choice }) => {
  return (
    <div className="videos">
      <section className={choice}>
        {video &&
          video.map(({ etag, snippet }: VideoRequestParams) => (
            <div
              className={choice == 'videos__list-content' ? 'videos__block2' : 'videos__block'}
              key={etag}>
              <img src={snippet.thumbnails.medium.url} />
              <div className={choice == 'videos__list-content' ? 'videos__info-text' : ''}>
                <h3 className="videos__title">
                  {snippet.title.length > 50 ? `${snippet.title.slice(0, 50)}...` : snippet.title}
                </h3>
                <p className="videos__subtitle">
                  {snippet.channelTitle.length > 30
                    ? snippet.channelTitle.slice(0, 30) + '...'
                    : snippet.channelTitle}
                </p>
              </div>
            </div>
          ))}
      </section>
    </div>
  );
};
