import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {View, Text, ScrollView, StyleSheet, Button} from 'react-native';
import Spacing from '../components/Spacing';
import {useAsyncStorage} from '../providers/AsyncStorageProvider';
import Header from '../components/Header';
import {MainParamList} from '../navigators/MainNavigator';

type Props = {
  navigation: StackNavigationProp<MainParamList, 'NewsFeed'>;
};

const NewsFeedScreen: React.FC<Props> = ({navigation}) => {
  const {state} = useAsyncStorage();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollView}>
      <View style={{elevation: 4, zIndex: 100}}>
        <Header title={'4334'} backButtonVisible={false} />
      </View>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Najnovšie články</Text>
          <Text style={styles.sectionDescription}>
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Posledne pridané piesne</Text>
          <Spacing size="md" />
          {/* <Button
            title="Async state"
            onPress={() => {
              console.log('test');
              console.log('async Storage:', state);
              console.log('song count:', Object.keys(state.songs).length);
            }}
          /> */}
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Piesne podľa témy</Text>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Naposledy pridané albumy</Text>
          <Text style={styles.sectionDescription}>
            Read the docs to discover what to do next:
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
    // paddingHorizontal: 16,
    paddingTop: 12 + 54,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'black',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    // fontFamily: 'Montserrat-SemiBold',
    fontWeight: '400',
    color: 'grey',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'grey',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default NewsFeedScreen;
