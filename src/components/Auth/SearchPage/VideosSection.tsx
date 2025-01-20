export const VideosSection = ({ video, searchText, choice }) => {
  return (
    <div className="videos">
      <section className={choice}>
        {video &&
          video.map(({ etag, snippet }) => (
            <div
              className={choice == 'videos__block-content' ? 'videos__block' : 'videos__block2'}
              key={etag}>
              <img src={snippet.thumbnails.medium.url} />
              <div className={choice == 'videos__block-content' ? '' : 'videos__info-text'}>
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
