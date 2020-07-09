import React, {FunctionComponent} from 'react';
import {Button} from 'react-native-paper';

const GreenButton: FunctionComponent = props => {
  return <Button dark theme={{colors: {primary: '#44d480'}}} {...props} />;
};

export default GreenButton;

/* usecase:

<GreenButton
mode="contained"
uppercase
onPress={() => {
  setChordsVisible(!chordsVisible);
}}
style={styles.button}>
Akordy
</GreenButton>

*/
