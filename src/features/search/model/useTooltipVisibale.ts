import { FavoriteRequestParams } from 'components/type';
import { useEffect, useState } from 'react';

export const useTooltipVisibale = (
  favoriteRequest: FavoriteRequestParams | null,
) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [iconHeart, setIconHeart] = useState('fa-regular fa-heart');
  const [checkFunc, setCheckFunc] = useState(false);

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
  return {
    iconHeart,
    setIconHeart,
    checkFunc,
    setCheckFunc,
    tooltipVisible,
    setTooltipVisible,
  };
};
