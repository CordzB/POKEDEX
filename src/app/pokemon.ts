export interface Pokemon {
  name: string;
  image: string;
  stats: {
    name: string;
    base: number;
  }[];
}
