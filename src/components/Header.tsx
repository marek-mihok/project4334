import React, {FunctionComponent} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Platform} from 'react-native';
import {Appbar, Text} from 'react-native-paper';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  title: string;
  icon?: string;
  backButtonVisible?: boolean;
  dark?: boolean;
};

const Header: FunctionComponent<Props> = ({
  title,
  children,
  icon,
  backButtonVisible = true,
  dark = false,
}) => {
  const navigation = useNavigation();

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        paddingBottom: 14,
        top: 0,
        left: 0,
        right: 0,
        overflow: 'hidden',
      }}>
      <View style={[styles.header, dark && {backgroundColor: '#363636'}]}>
        {backButtonVisible && (
          <View style={styles.backButtonWrapper}>
            <TouchableHighlight
              style={styles.backButton}
              onPress={onPressBack}
              underlayColor={'#bbb'}>
              <Icon
                name={Platform.OS === 'android' ? 'arrow-left' : 'chevron-left'}
                size={Platform.OS === 'android' ? 24 : 28}
                color={dark ? '#fff' : '#363636'}
              />
            </TouchableHighlight>
          </View>
        )}
        <View style={styles.titleWrapper}>
          <Text
            style={[styles.songTitle, dark && {color: '#fff'}]}
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
    backgroundColor: 'transparent',
  },
  backButtonWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 58,
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4, // brings to top on android
    zIndex: 100, // brings to top on iOS
    backgroundColor: 'transparent',
  },
});

export default Header;
