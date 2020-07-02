import React, {FunctionComponent} from 'react';
import {View} from 'react-native';

export type SpacingSizes = keyof typeof spacingSizes;

type Props = {
  size?: SpacingSizes;
};

const spacingSizes = {
  sm: 10,
  md: 25,
  lg: 40,
};

const Spacing: FunctionComponent<Props> = ({size}) => {
  return <View style={{height: spacingSizes[size || 'sm']}}></View>;
};

export default Spacing;
