import React, {FunctionComponent} from 'react';
import {Button} from 'react-native-paper';

const GreenButton: FunctionComponent = props => {
  return <Button dark theme={{colors: {primary: '#44d480'}}} {...props} />;
};

export default GreenButton;
