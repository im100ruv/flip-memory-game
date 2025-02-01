import { ReactElement } from "react";

export type TileType = {
  name: string;
  url: string;
}

export type InstructionsProps = {
  onStart: () => void
}

export type ModalProps = {
  children: ReactElement;
  boxStyle?: string;
  backdropStyle?: string;
  onBackdropClick?: () => void;
};