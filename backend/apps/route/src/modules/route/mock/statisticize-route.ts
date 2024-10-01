type StatisticizeRoute = {
  totalRoutes: number;
  topLocations: { [key: string]: number }[];
};

export const statistizieRoute: StatisticizeRoute = {
  totalRoutes: 1,
  topLocations: [{ 'Location A': 2 }, { 'Location B': 1 }, { 'Location C': 1 }],
};
