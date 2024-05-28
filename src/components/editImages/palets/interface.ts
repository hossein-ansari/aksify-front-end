interface IImage {
  image: string;
  selected: boolean;
  X: number;
  Y: number;
  id: string;
  isDrag: boolean;
}
interface IShape {
  shape: string;
  selected: boolean;
  X: number;
  Y: number;
  id: string;
  isDrag: boolean;
}

export type { IImage, IShape };
