import { authGet } from './axiosClient';

/** get statistic data for admin dashboard */
export const getGeneralStatistics = () => {
  const url = '/statistic/general';
  return authGet(url);
};

/** get top product for admin dashboard */
export const getTopProductStatistics = () => {
  const url = '/statistic/top';
  return authGet(url);
};
