import { FC } from 'react';
import { VideosSectionProps } from 'shared/types';
import './videosSection.scss';
import { VideoBlock } from './VideoBlock';

export const VideosSection: FC<VideosSectionProps> = ({ video, choice }) => {
  return (
    <div className="videos">
      <section className={choice}>
        {video?.map((item) => (
          <VideoBlock item={item} choice={choice} key={item.id} />
        ))}
      </section>
    </div>
  );
};
