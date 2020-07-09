import React, {FunctionComponent} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  // SafeAreaView,
  // StatusBar,
  // Platform,
} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  title: string;
  icon?: string;
};

const Header: FunctionComponent<Props> = ({title, children, icon}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };

  // TODO: change back button icon for iOS platform

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        paddingBottom: 14,
        top: 0,
        left: 0,
        right: 0,
        // top: 0,
        overflow: 'hidden',
        // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        // backgroundColor: 'blue',
      }}>
      <View style={styles.header}>
        <View style={styles.backButtonWrapper}>
          <TouchableHighlight
            style={styles.backButton}
            onPress={onPressBack}
            underlayColor={'#bbb'}>
            <Icon name="arrow-left" size={24} />
          </TouchableHighlight>
        </View>
        <View style={styles.titleWrapper}>
          <Text
            style={styles.songTitle}
            ellipsizeMode="tail"
            // adjustsFontSizeToFit={true}
            numberOfLines={1}>
            {title}
          </Text>
        </View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 58,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleWrapper: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 58,
    alignSelf: 'center',
  },
  songTitle: {
    textAlign: 'center',
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 23,
    fontWeight: '700',
  },
  backButton: {
    height: 48,
    width: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 90,
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 58,
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
