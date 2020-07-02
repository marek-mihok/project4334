import React, {FunctionComponent} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Appbar, Text} from 'react-native-paper';

type Props = {
  title: string;
  icon?: string;
};

const Header: FunctionComponent<Props> = ({title, children, icon}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View>
      <Appbar.Header dark={false} style={styles.header}>
        {/* <Appbar.Action icon={icon || 'arrow-left'} onPress={onPressBack} /> */}
        <Appbar.BackAction onPress={onPressBack} />
        <Appbar.Content
          style={styles.content}
          title={<Text style={styles.title}>{title}</Text>}
          //   subtitle={<Text style={styles.subtitle}>{title}</Text>}
        />
        {children}
      </Appbar.Header>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    shadowOpacity: 0,
    elevation: 0,
    shadowColor: 'transparent',
    backgroundColor: 'transparent',
  },
  content: {
    // alignItems: 'center'
    // backgroundColor: 'yellow',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    textTransform: 'uppercase',
  },
  subtitle: {
    padding: 8,
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
});

export default Header;
