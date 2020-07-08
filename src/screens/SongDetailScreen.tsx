import React, {useState, useEffect} from 'react';
import {View, ScrollView, StyleSheet,  Image} from 'react-native';
import {Text} from 'react-native-paper';
import GreenButton from '../components/Button';
import Header from '../components/Header';
import Spacing from '../components/Spacing';
import { TouchableHighlight } from 'react-native-gesture-handler';

// TIP: https://medium.com/free-code-camp/a-first-look-at-firstborn-react-natives-new-component-library-51403077a632
// TIP: https://medium.com/@rossbulat/theming-in-react-native-explained-ac40d0d2e15c

const songTitle = 'Verný Boh';
//const chordSheet = `{c: intro: 2x}\r\n\r\n[E][c#][A]\r\n\r\n{c: 1:}\r\n\r\n[E] Priblížiť sa k láske, [c#] ktorá seba [A]dáva\r\n[E] priblížiť sa k láske, [c#] ktorá všetko [A]žiada\r\n\r\n{c: prechorus:}\r\n\r\n[f#] Do [E/G#]svojej [H]prítomnosti [E/G#] zahaľ [A]nás\r\n[f#] a v [E/G#]tôni [H]svojich krídel [E/G#] ukry [A]nás\r\n\r\n{c: chorus:}\r\n\r\nVždy byť [E]blíz[H]ko, [c#][A] po tom [E]tú[H]žim[c#][A]\r\ntvoja [E]lás[H]ka [c#][A] je môj [E][c#]ú[H]kryt\r\n\r\n{c: Interlude}\r\n\r\n{c: 1}\r\n\r\n{c: prechorus}\r\n\r\n{c: chorus 2x}\r\n\r\n{c: interlude 2: 2x}\r\n\r\n[A][c#][A][E][H]\r\n\r\n{c: bridge: 6x}\r\n\r\nEmanu[f#]el, Emanu[c#]el\r\nEmanu[f#]el, Emanu[E][H]el\r\n\r\n{c: woah outro: 2x}\r\n\r\n[f#][c#][f#][E][H]`;
const chordSheetCrdString = `{c: intro}{c: 1:}\n[h] Nemôžem [D]prestať [G]myslieť na teba [a]\n[h] nemôžem [D] sa ťa stria[G/F]sť\n[h] Si ako [D]oheň v mojom [G]vnútri, čo páli ma\n[h] p[D]áliš ma[G]\n{c: interlude: 2x}\n[e][G][C]\n{c: 1}{c: prechorus:}\n[e] Si [G]všetko, čo [C]chcem\n[e] Si [G]všetko, čo [C]mám\n[e] A aj keď [D]zdá sa, že sp[E][c#][H]íš\nja tvoje meno zavo[C]lám\nproti búrkam, proti tmám\n{c: chorus: 2x}\nSi [G]verný Boh a [D]verný Kráľ\n[e]dokončíš dielo, [C]ktoré si vo mne začal\n[G]Verný Boh a [D]verný Kráľ\n[e]nevzdáš sa snov, ktoré si [C]so mnou snívať začal\n{c: interlude}\n[G][D][e][C]\n{c: bridge: 4x}\n[G] Ohlásim zo striech\nže [h]ľúbiš mňa a ja ľúbim teba\n[e] Ohlásim zo striech\nže si [C]verný a verný a verný Kráľ\n(si verný a verný Kráľ)\n{c: 1}{c: interlude}{c: 1}{c: prechorus}{c: chorus 2x}{c: interlude}{c: bridge 4x}{c: bridge 2: 4x}\nSi verný [G]Kráľ\nWoa[h]h\nSi verný [e]Kráľ\nWoa[C]h\n{c: outro}`;

const SongDetailScreen = () => {
  const [chordsVisible, setChordsVisible] = useState(true);
  const [captionsVisible, setCaptionsVisible] = useState(false);

  const [textSizes, setTextSizes] = useState([16,19,22,25]);

  const rotate = ( array: number[], times: number ) => {
    array = array.slice();
    while( times-- ){
      let temp = array.shift();
      array.push( temp )
    }
    return array;
  }

// https://4334.sk/wp-json/wp/v2/song?orderby=date&order=desc&orderby=date&after=2020-05-24T13:00:00

  const userAction = async () => {
    const response = await fetch('https://4334.sk/wp-json/wp/v2/song/');
    const myJson = await response.json(); //extract JSON from the http response
    // do something with myJson
    console.log(myJson)
  }

  const chordSheetRows = chordSheetCrdString.split('\n'); // TODO: what if there is \n\n

  const chordSheet = chordSheetRows.map((row, rowIdx) => {
    let captions = row.match(/{[^{}]+}/g);
    if (captions) {
      let captionsParsed = captions.map((caption, captionIdx) => {
        if (caption.startsWith('{column_break')) {
          // TODO: replace startsWith
          return (
            <View
              key={captionIdx + 'cb'}
              style={chordLyricsStyles.columnBreak}
            />
          );
        }
        if (
          captionsVisible &&
          (caption.startsWith('{column_break') ||
            caption.startsWith('{c:') ||
            caption.startsWith('{ci:'))
        ) {
          return (
            // TODO: format caption
            <View
              key={captionIdx + 'view'}
              style={chordLyricsStyles.captionWrapper}>
              <Text
                key={captionIdx + 'text'}
                style={[
                  chordLyricsStyles.caption, {fontSize: textSizes[0]},
                  caption.startsWith('{ci:')
                    ? chordLyricsStyles.captionItalic
                    : null,
                ]}>
                {caption} 
              </Text>
            </View>
          );
        }
        return null;
      });
      return captionsParsed;
    }

    // TODO: replace \n's in row with empty row
    const rowStart = row.match(/^\[[^\[\]]+\][ ]/g);
    const rowEnd = row.match(/[ ]\[[^\[\]]+\]$/g);
    const rowMiddle = row?.replace(/^\[[^\[\]]+\][ ]/g, '').replace(/[ ]\[[^\[\]]+\]$/g, '')?.match(/(\[[^\[\]]*\])?[^\[]*/g)?.filter(rowPart => rowPart !== '');



    const rowStartParsed = rowStart ? (<View style={chordLyricsStyles.chordsLyricsWrapper}>
    <View style={chordLyricsStyles.chordsWrapper}>
      {chordsVisible ? (
        <View style={chordLyricsStyles.chord}>
          <Text style={[chordLyricsStyles.chordsText, {fontSize: textSizes[0]}]}>{rowStart[0].slice(1,-2)}</Text>
        </View>
      ) : null}
    </View>
    <View style={chordLyricsStyles.lyricsWrapper}>
      <View style={chordLyricsStyles.lyrics}>
        <Text style={[chordLyricsStyles.lyricsText, {fontSize: textSizes[0]}]} />
      </View>
    </View>
  </View> ) : null;

  const rowMiddleParsed = rowMiddle?.map(row => {
    let chord = row.match(/(\[[^\[\]]*\])/g);
    let lyrics = row.match(/[^\[\]]*(?![^\[\]]*\])/g)?.filter(word => word !== "");
return(
    <View style={chordLyricsStyles.chordsLyricsWrapper}>
    { chord && <View style={chordLyricsStyles.chordsWrapper}>
      {chordsVisible ? (
        <View style={chordLyricsStyles.chord}>
          <Text style={[chordLyricsStyles.chordsText, {fontSize: textSizes[0]}]}>{chord[0].slice(1,-1)}</Text>
        </View>
      ) : null}
    </View>  }
    {lyrics &&
    <View style={chordLyricsStyles.lyricsWrapper}>
      <View style={chordLyricsStyles.lyrics}>
        <Text style={[chordLyricsStyles.lyricsText, {fontSize: textSizes[0]}]}>{lyrics[0]}</Text>
      </View>
    </View>}
  </View>)
  });

  const rowEndParsed = rowEnd ? (<View style={chordLyricsStyles.chordsLyricsWrapper}>
    <View style={chordLyricsStyles.chordsWrapper}>
      {chordsVisible ? (
        <View style={chordLyricsStyles.chord}>
          <Text style={[chordLyricsStyles.chordsText, {fontSize: textSizes[0]}]}>{rowEnd[0].slice(2,-1)}</Text>
        </View>
      ) : null}
    </View>
    <View style={chordLyricsStyles.lyricsWrapper}>
      <View style={chordLyricsStyles.lyrics}>
        <Text style={[chordLyricsStyles.lyricsText, {fontSize: textSizes[0]}]} />
      </View>
    </View>
  </View> ) : null;;

    return (
      <View style={chordLyricsStyles.rowWrapper}>
        {rowStartParsed} 
        {rowMiddleParsed} 
        {rowEndParsed}
      </View>
    );
  });

  return (
    <>
      <Header title={songTitle} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingTop: 24 + 54, paddingBottom: 120 }} // TODO: adjust padding bottom based on button width and device screen; adjust padding top based on header height
        style={styles.scrollView}>
        <View style={styles.body}>
          {/* <Text style={styles.songTitle}>{songTitle}</Text> */}
          {/* <Spacing size="md" /> */}
        
          <View style={chordLyricsStyles.lyricsContainer}>
           {chordSheet}
          </View>
        </View>
      </ScrollView>
      {/* <View style={styles.buttonWrapper}>
        <GreenButton
          mode="contained"
          uppercase
          onPress={() => {
            setChordsVisible(!chordsVisible);
          }}
          style={styles.button}>
          Akordy
        </GreenButton>
        <Spacing size="sm" />
        <GreenButton
          mode="contained"
          uppercase
          onPress={() => {
            setCaptionsVisible(!captionsVisible);
          }} style={styles.button}>
          Captions
        </GreenButton>
      </View> */}
      <View style={styles.bottomTabs}>
<View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'} onPress={() => {setChordsVisible(!chordsVisible)}}><Image style={{height: 24, width: 24, }} source={require('../assets/images/icon-guitar-white.png')}/></TouchableHighlight></View>
{/* <View style={styles.tabDivider}></View> */}
<View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'}  onPress={() => {setCaptionsVisible(!captionsVisible)}}><Image style={{height: 24, width: 24}} source={require('../assets/images/icon-captions-white.png')}/></TouchableHighlight></View>
{/* <View style={styles.tabDivider}></View> */}
<View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'}  onPress={() => {userAction();} }><Text style={{fontSize: 18, color: '#fff'}}>+1</Text></TouchableHighlight></View>
{/* <View style={styles.tabDivider}></View> */}
<View style={styles.tab} ><Text style={{fontSize: 18, color: 'white'}}>-1</Text></View>
<View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'}  onPress={() => {setTextSizes(rotate(textSizes, 1))}}><Text style={{fontSize: 18, color: 'white'}}>Aa</Text></TouchableHighlight></View>
      </View>
    </>
  );
};

const chordLyricsStyles = StyleSheet.create({
  lyricsContainer: {
    marginHorizontal: 0,
  },
  rowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  chordsLyricsWrapper: {
    flexDirection: 'column',

    justifyContent: 'flex-end',
  },
  chordsWrapper: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  lyricsWrapper: {},
  lyrics: {},
  chord: {
    backgroundColor: 'rgba(54, 218, 83, 0.3)',
    paddingHorizontal: 2.5,
    borderRadius: 3,
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
  captionWrapper: {alignItems: 'center', paddingVertical: 12},
  caption: {
    color: '#bbb',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '100',
  },
  captionItalic: {fontStyle: 'italic'},
  columnBreak: {
    width: '100%',
    height: 0.75,
    backgroundColor: '#bbb',
    marginVertical: 24,
  },
});

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'transparent',
  },
  body: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  songTitle: {
    alignSelf: 'center',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '700',
  },
  buttonWrapper: {
    position: 'absolute', 
    bottom: 20, 
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
  },
  bottomTabs: {
    position: 'absolute', 
    bottom: 16, 
    alignSelf: 'center',
    marginHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    backgroundColor: '#44d480',
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    opacity: 0.95
  },
  tab: {
    flex: 1,
    height: 80,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTouchable: {    alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center', height: 64, width: 64, borderRadius: 14},
  tabDivider: {
    height: 36,
    width: 0.65,
    backgroundColor: '#fff',
    opacity: 0.6,
  }
});

export default SongDetailScreen;
