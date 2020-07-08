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
    // <View>
    <View
      style={{
        // overflow: 'hidden',
        position: 'absolute',
        width: '100%',
        paddingBottom: 14,
        // backgroundColor: 'blue',
      }}>
      <Appbar.Header dark={false} style={styles.header}>
        {/* <Appbar.Action icon={icon || 'arrow-left'} onPress={onPressBack} /> */}
        <Appbar.BackAction onPress={onPressBack} color={'#000'} />
        <View style={styles.titleWrapper}>
          <Text style={styles.songTitle}>{title}</Text>
        </View>
        {/* <Appbar.Content
        style={styles.content}
        title={<Text style={styles.title}>{title}</Text>}
        // subtitle={<Text style={styles.subtitle}>{title}</Text>}
      /> */}
        {children}
      </Appbar.Header>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // shadowOpacity: 0,
    // elevation: 0,
    // shadowColor: 'transparent',
    // borderRadius: 14,
    // backgroundColor: 'transparent',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    // justifyContent: 'center',
    // zIndex: 10000,
    // backgroundColor: '#555',
  },
  content: {
    alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    // color: '#fff',
    textTransform: 'uppercase',
  },
  subtitle: {
    padding: 8,
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  titleWrapper: {
    position: 'absolute',
    top: 13,
    width: '100%',
    backgroundColor: 'transparent',
    // backgroundColor: 'red',
    alignSelf: 'center',
    // justifyContent: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
  },
  songTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '700',
    // backgroundColor: 'yellow',
  },
});

export default Header;
