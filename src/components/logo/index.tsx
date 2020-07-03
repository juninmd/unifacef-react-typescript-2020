import React from "react";
import { Image } from "semantic-ui-react";

interface Props {
  src: string;
}
export default function Logo(props: Props) {

  const { src } = props;

  return (
    <Image src={src} />
  );
}