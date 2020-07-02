import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';

const FlexWrapTest = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.columnLeft}>
            <View style={styles.squareA} />
          </View>
          <View style={styles.columnMiddle}>
            <View style={styles.rectangleA} />
            <View style={styles.rectangleB} />
            <View style={styles.rectangleC} />
          </View>
          <View style={styles.columnRight}>
            <View style={styles.squareA} />
          </View>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'grey',
          // flexDirection: 'row',
          // alignItems: 'center',
          marginHorizontal: 125,
        }}>
        <Text style={{textAlign: 'center'}}>
          <Text>
            <Text
              style={{
                backgroundColor: 'yellow',
              }}>
              {`DGa`}
            </Text>
          </Text>
          <Text>
            <Text
              style={{
                // flexDirection: 'row',
                // flexWrap: 'wrap',
                // includeFontPadding: false,
                // textAlign: 'center',
                backgroundColor: 'lightgray',
              }}>
              {`one two Three FourFive`}
            </Text>
          </Text>
          <Text>
            <Text
              style={{
                backgroundColor: 'yellow',
              }}>
              {`DGa`}
            </Text>
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    marginHorizontal: 110, // nastavit podla sirky testovacieho zariadenia tak, aby sa column middle rozdelil na 2 riadky
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
  },
  columnLeft: {
    flexDirection: 'column',
  },
  columnMiddle: {
    flexWrap: 'wrap', // musi byt wrap
    flexDirection: 'row', // musi byt row
    justifyContent: 'center', // musi byt center
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'lightgrey',
  },
  columnRight: {
    flexDirection: 'column',
  },
  squareA: {
    width: 40,
    height: 50,
    backgroundColor: 'yellow',
  },
  rectangleA: {
    width: 60,
    height: 50,
    backgroundColor: 'red',
  },
  rectangleB: {
    width: 70,
    height: 50,
    backgroundColor: 'blue',
  },
  rectangleC: {
    width: 80,
    height: 50,
    backgroundColor: 'green',
  },
});

export default FlexWrapTest;
