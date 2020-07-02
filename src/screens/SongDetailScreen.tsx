import React, {useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
// import {Text} from 'react-native-paper';
import GreenButton from '../components/Button';
import Header from '../components/Header';
import Spacing from '../components/Spacing';

// TIP: https://medium.com/free-code-camp/a-first-look-at-firstborn-react-natives-new-component-library-51403077a632
// TIP: https://medium.com/@rossbulat/theming-in-react-native-explained-ac40d0d2e15c

const songTitle = 'Verný Boh';
//const chordSheet = `{c: intro: 2x}\r\n\r\n[E][c#][A]\r\n\r\n{c: 1:}\r\n\r\n[E] Priblížiť sa k láske, [c#] ktorá seba [A]dáva\r\n[E] priblížiť sa k láske, [c#] ktorá všetko [A]žiada\r\n\r\n{c: prechorus:}\r\n\r\n[f#] Do [E/G#]svojej [H]prítomnosti [E/G#] zahaľ [A]nás\r\n[f#] a v [E/G#]tôni [H]svojich krídel [E/G#] ukry [A]nás\r\n\r\n{c: chorus:}\r\n\r\nVždy byť [E]blíz[H]ko, [c#][A] po tom [E]tú[H]žim[c#][A]\r\ntvoja [E]lás[H]ka [c#][A] je môj [E][c#]ú[H]kryt\r\n\r\n{c: Interlude}\r\n\r\n{c: 1}\r\n\r\n{c: prechorus}\r\n\r\n{c: chorus 2x}\r\n\r\n{c: interlude 2: 2x}\r\n\r\n[A][c#][A][E][H]\r\n\r\n{c: bridge: 6x}\r\n\r\nEmanu[f#]el, Emanu[c#]el\r\nEmanu[f#]el, Emanu[E][H]el\r\n\r\n{c: woah outro: 2x}\r\n\r\n[f#][c#][f#][E][H]`;
const chordSheet = `{c: intro}{c: 1:}\n[h] Nemôžem [D]prestať [G]myslieť na teba\n[h] nemôžem [D] sa ťa stria[G]sť\n[h] Si ako [D]oheň v mojom [G]vnútri, čo páli ma\n[h] p[D]áliš ma[G]\n{c: interlude: 2x}\n[e][G][C]\n{c: 1}{c: prechorus:}\n[e] Si [G]všetko, čo [C]chcem\n[e] Si [G]všetko, čo [C]mám\n[e] A aj keď [D]zdá sa, že [h]spíš\nja tvoje meno zavo[C]lám\nproti búrkam, proti tmám\n{c: chorus: 2x}\nSi [G]verný Boh a [D]verný Kráľ\n[e]dokončíš dielo, [C]ktoré si vo mne začal\n[G]Verný Boh a [D]verný Kráľ\n[e]nevzdáš sa snov, ktoré si [C]so mnou snívať začal\n{c: interlude}\n[G][D][e][C]\n{c: bridge: 4x}\n[G] Ohlásim zo striech\nže [h]ľúbiš mňa a ja ľúbim teba\n[e] Ohlásim zo striech\nže si [C]verný a verný a verný Kráľ\n(si verný a verný Kráľ)\n{c: 1}{c: interlude}{c: 1}{c: prechorus}{c: chorus 2x}{c: interlude}{c: bridge 4x}{c: bridge 2: 4x}\nSi verný [G]Kráľ\nWoa[h]h\nSi verný [e]Kráľ\nWoa[C]h\n{c: outro}`;

const SongDetailScreen = () => {
  const [chordsVisible, setChordsVisible] = useState(false);

  return (
    <>
      <Header title={songTitle} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <View style={styles.body}>
          {/* <Text style={styles.songTitle}>{songTitle}</Text> */}
          <Spacing size="md" />
          <View style={chordLyricsStyles.lyricsContainer}>
            <View style={chordLyricsStyles.rowWrapper}>
              <View style={chordLyricsStyles.leftWrapper}>
                <View style={chordLyricsStyles.chordsLyricsWrapper}>
                  <View style={chordLyricsStyles.chordsWrapper}>
                    {chordsVisible ? (
                      <View style={chordLyricsStyles.chord}>
                        <Text style={chordLyricsStyles.chordsText}>h</Text>
                      </View>
                    ) : null}
                  </View>
                  {/* <View style={chordLyricsStyles.lyricsWrapper}>
                    <View style={chordLyricsStyles.lyrics}>
                      <Text style={chordLyricsStyles.lyricsText} />
                    </View>
                  </View> */}
                </View>
              </View>

              <View style={chordLyricsStyles.inlineWrapper}>
                <View style={chordLyricsStyles.chordsLyricsWrapper}>
                  {/* <View style={chordLyricsStyles.chordsWrapper} >
                    <View style={chordLyricsStyles.chord}>
                      <Text style={chordLyricsStyles.chordsText} />
                    </View>
                  </View> */}
                  <View style={chordLyricsStyles.lyricsWrapper}>
                    <View style={chordLyricsStyles.lyrics}>
                      <Text style={chordLyricsStyles.lyricsText}>Nemôžem </Text>
                    </View>
                  </View>
                </View>
                <View style={chordLyricsStyles.chordsLyricsWrapper}>
                  <View style={chordLyricsStyles.chordsWrapper}>
                    {chordsVisible ? (
                      <View style={chordLyricsStyles.chord}>
                        <Text style={chordLyricsStyles.chordsText}>D</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={chordLyricsStyles.lyricsWrapper}>
                    <View style={chordLyricsStyles.lyrics}>
                      <Text style={chordLyricsStyles.lyricsText}>prestať </Text>
                    </View>
                  </View>
                </View>
                <View style={chordLyricsStyles.chordsLyricsWrapper}>
                  <View style={chordLyricsStyles.chordsWrapper}>
                    {chordsVisible ? (
                      <View style={chordLyricsStyles.chord}>
                        <Text style={chordLyricsStyles.chordsText}>G</Text>
                      </View>
                    ) : null}
                  </View>
                  <View style={chordLyricsStyles.lyricsWrapper}>
                    <View style={chordLyricsStyles.lyrics}>
                      <Text style={chordLyricsStyles.lyricsText}>
                        myslieť na teba
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={chordLyricsStyles.rightWrapper}>
                <View style={chordLyricsStyles.chordsLyricsWrapper}>
                  <View style={chordLyricsStyles.chordsWrapper}>
                    {chordsVisible ? (
                      <View style={chordLyricsStyles.chord}>
                        <Text style={chordLyricsStyles.chordsText}>d</Text>
                      </View>
                    ) : null}
                  </View>
                  {/* <View style={chordLyricsStyles.lyricsWrapper}>
                  <View style={chordLyricsStyles.lyrics}>
                    <Text style={chordLyricsStyles.lyricsText} />
                  </View>
                </View> */}
                </View>
              </View>
            </View>
          </View>
          <Spacing size="md" />
          <GreenButton
            mode="contained"
            uppercase
            onPress={() => {
              chordsVisible ? setChordsVisible(false) : setChordsVisible(true);
            }}>
            Akordy
          </GreenButton>
        </View>
      </ScrollView>
    </>
  );
};

const chordLyricsStyles = StyleSheet.create({
  lyricsContainer: {
    marginHorizontal: 80,
    // flex: 1,
  },
  rowWrapper: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap', // or wrap?
    justifyContent: 'center',
  },
  leftWrapper: {
    flexWrap: 'nowrap',
    backgroundColor: 'yellow',
    flexDirection: 'column',
    // flexGrow: 1,
    alignItems: 'flex-end',
  },
  inlineWrapper: {
    // flex: 0,
    flexWrap: 'wrap',
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'center',

    // alignSelf: 'center',
    // width: 143,
    // justifyContent: 'flex-start',
  },
  rightWrapper: {
    flexWrap: 'nowrap',
    backgroundColor: 'lightgrey',
    flexDirection: 'column',
    // flexGrow: 1,
    alignItems: 'flex-start',
  },
  chordsLyricsWrapper: {
    // alignContent: 'center',
    flexDirection: 'column',
    // alignContent: 'flex-end',
    // alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // alignItems: 'flex-start',
    // alignSelf: 'flex-start',
    // flexGrow: 1,
    borderColor: 'blue',
    borderWidth: 1,
  },
  chordsWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    // flexShrink: 1,
  },
  lyricsWrapper: {
    backgroundColor: 'red',
    borderColor: 'black',
    borderWidth: 1,
  },
  lyrics: {},
  chord: {
    backgroundColor: 'rgba(54, 218, 83, 0.3)',
  },
  lyricsText: {
    fontFamily: 'Enriqueta-Regular',
    fontSize: 16,
  },
  chordsText: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '600',
  },
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
    // flex: 1,
  },
  body: {
    padding: 16,
    backgroundColor: 'transparent',
    // flex: 1,
  },
  songTitle: {
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '700',
  },
});

export default SongDetailScreen;
