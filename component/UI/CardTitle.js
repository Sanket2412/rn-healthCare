import React from "react";
import { Card } from "react-native-paper";

const CardTitle = (props) => {
  return (
    <Card.Title
      title={props.title ? props.title : null}
      titleNumberOfLines={props.titleNumberOfLines ? props.titleNumberOfLines: null}
      subtitle={props.subtitle ? props.subtitle : null}
      titleStyle={props.titleStyle ? { ...props.titleStyle } : null}
    />
  );
};
export default CardTitle;
