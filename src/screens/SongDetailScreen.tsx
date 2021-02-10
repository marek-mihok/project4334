import React, {useState, FunctionComponent} from 'react';
import {View, ScrollView, StyleSheet,  Image, Animated, Platform, } from 'react-native';
import {Text, Title,} from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';
import Header from '../components/Header';
import Spacing from '../components/Spacing';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
import InsetShadow from 'react-native-inset-shadow'
import { StackNavigationProp } from '@react-navigation/stack';
import { MainParamList } from '../navigators/MainNavigator';
import { RouteProp } from '@react-navigation/native';
import { useSongs } from '../providers/SongProvider';

// TIP: https://medium.com/free-code-camp/a-first-look-at-firstborn-react-natives-new-component-library-51403077a632
// TIP: https://medium.com/@rossbulat/theming-in-react-native-explained-ac40d0d2e15c

// const songTitle = 'Verný Boh';
//const chordSheet = `{c: intro: 2x}\r\n\r\n[E][c#][A]\r\n\r\n{c: 1:}\r\n\r\n[E] Priblížiť sa k láske, [c#] ktorá seba [A]dáva\r\n[E] priblížiť sa k láske, [c#] ktorá všetko [A]žiada\r\n\r\n{c: prechorus:}\r\n\r\n[f#] Do [E/G#]svojej [H]prítomnosti [E/G#] zahaľ [A]nás\r\n[f#] a v [E/G#]tôni [H]svojich krídel [E/G#] ukry [A]nás\r\n\r\n{c: chorus:}\r\n\r\nVždy byť [E]blíz[H]ko, [c#][A] po tom [E]tú[H]žim[c#][A]\r\ntvoja [E]lás[H]ka [c#][A] je môj [E][c#]ú[H]kryt\r\n\r\n{c: Interlude}\r\n\r\n{c: 1}\r\n\r\n{c: prechorus}\r\n\r\n{c: chorus 2x}\r\n\r\n{c: interlude 2: 2x}\r\n\r\n[A][c#][A][E][H]\r\n\r\n{c: bridge: 6x}\r\n\r\nEmanu[f#]el, Emanu[c#]el\r\nEmanu[f#]el, Emanu[E][H]el\r\n\r\n{c: woah outro: 2x}\r\n\r\n[f#][c#][f#][E][H]`;
// const chordSheetCrdString = `{c: intro}{c: 1:}\n[h] Nemôžem [D]prestať [G]myslieť na teba [a]\n[h] nemôžem [D] sa ťa stria[G/F]sť\n[h] Si ako [D]oheň v mojom [G]vnútri, čo páli ma\n[h] p[D]áliš ma[G]\n{c: interlude: 2x}\n[e][G][C]\n{c: 1}{c: prechorus:}\n[e] Si [G]všetko, čo [C]chcem\n[e] Si [G]všetko, čo [C]mám\n[e] A aj keď [D]zdá sa, že sp[E][c#][H]íš\nja tvoje meno zavo[C]lám\nproti búrkam, proti tmám\n{c: chorus: 2x}\nSi [G]verný Boh a [D]verný Kráľ\n[e]dokončíš dielo, [C]ktoré si vo mne začal\n[G]Verný Boh a [D]verný Kráľ\n[e]nevzdáš sa snov, ktoré si [C]so mnou snívať začal\n{c: interlude}\n[G][D][e][C]\n{c: bridge: 4x}\n[G][Fmaj7] Ohlásim zo striech\nže [h]ľúbiš mňa a ja ľúbim teba\n[e] Ohlásim zo striech\nže si [C]verný a verný a verný Kráľ\n(si verný a verný Kráľ)\n{c: 1}{c: interlude}{c: 1}{c: prechorus}{c: chorus 2x}{c: interlude}{c: bridge 4x}{c: bridge 2: 4x}\nSi verný [G]Kráľ\nWoa[h]h\nSi verný [e]Kráľ\nWoa[C]h\n{c: outro}`;

type Props = {
  navigation: StackNavigationProp<MainParamList, 'SongDetail'>;
  route: RouteProp<MainParamList, 'SongDetail'>;
  theme: Theme;
}

const SongDetailScreen: FunctionComponent<Props> = ({route}) => {
  const [chordsVisible, setChordsVisible] = useState(false);
  const [captionsVisible, setCaptionsVisible] = useState(false);
  const insets = useSafeArea();
  const {songId} = route.params;
  const {songs} = useSongs();
  // console.log('songId:', songId);
  // console.log('song:', songs[songId].chordpro);
  const songTitle = songs[songId].title;
  const chordpro = songs[songId].chordpro;
  const metaKey = songs[songId].key;
  const metaCapo = songs[songId].capo;
  const metaTempo = songs[songId].tempo;
  const metaBibleRef = songs[songId].bible_ref;
  const metaTextAuthor = songs[songId].text;
  const metaSpotifyUrl = songs[songId].spotify;
  const metaYoutubeUrl = songs[songId].video;
  const chordSheetCrdString = chordpro.startsWith('[chordwp]') ? chordpro.substring(9, chordpro.length - 10) : chordpro; // TODO: check if all cases are handled
  console.log('chordSheetCrdString:',chordSheetCrdString);
console.log('song state:', songs[songId]);

  const [textSizes, setTextSizes] = useState([16,19,22,25]);
  // TODO: fix iOS vertical align issue
  // TODO: remove empty spaces left when chords and captions are turned off 
  // TODO: add metadata
  // TODO: zobrazit prazdne riadky, napriklad pred samostatnymi akordami bez textu
  // TODO: spotify support
  // TODO: disable scroll animations when text does not overflow screen
  // TODO: REST download
  // TODO: horizontal line under multiple chords
  // TODO: check if highlighted active bottom tabs work properly on all devices
  // TODO: finish transposition: transpo indicator, transpo clear
  // TODO: QR Code playlist share
  // TODO: Double tap for showing chords
  // TODO: Tap to hide/show header and bottom control panel
  // TODO: Optimize performance by not re-computing the song component when showing/hiding chords/captions, but base it just on child component's visibility
  const [chordsMajor, setChordsMajor] = useState<string[]>(['C','C#','D','D#','E','F','F#','G','G#','A','A#','H']);

  // animation for bottom tabs
  const btScrollY = new Animated.Value(0);
  const btDiffClamp = Animated.diffClamp(btScrollY, 0, 100);
  const btTranslateY = btDiffClamp.interpolate({inputRange:[0,100], outputRange:[0,100]});

  // animation for header
  const headerScrollY = new Animated.Value(0);
  const headerDiffClamp = Animated.diffClamp(headerScrollY, 0, 62 +insets.top);
  const headerTranslateY = headerDiffClamp.interpolate({inputRange:[0,62 + insets.top], outputRange:[0,-62 - insets.top]});


  const rotate = ( array: any[], times: number, reverse: boolean = false ) => {
    array = array.slice();
    while( times-- ){
      if(reverse){
        array.unshift(array.pop());
      }else{
        array.push( array.shift() )
      }
    }
    return array;
  }

  const transpose = (chord: string) => {
    if(chord.includes('/')){
      const chordSplit = chord.split('/');
      return transpose(chordSplit[0]) + '/' + transpose(chordSplit[1]);
    }
    let toneExtracted = chord.match(/^[a-zA-Z][#]?/g) || chord.charAt(0);
    let chordTone : string = toneExtracted && toneExtracted[0];
    let chordIndex : number | null = getChordIndex(chordTone);
    let isMajor: boolean = (chordTone.charCodeAt(0) >= 65 && chordTone.charCodeAt(0) <= 90);
    if(chordIndex !== null){
      let chordToneTransposed = isMajor ? chordsMajor[chordIndex] : chordsMajor[chordIndex].toLowerCase();
      return chordToneTransposed + chord.slice(toneExtracted[0].length || 1);
    }else{
      return chord;
    }
  }

  const getChordIndex = (chordTone: string) => {
    switch(chordTone.toUpperCase()){
      case 'C':
        return 0;
      case 'C#':
        return 1;
      case 'D':
        return 2;
      case 'D#':
        return 3;
      case 'E':
        return 4;
      case 'F':
        return 5;
      case 'F#':
        return 6;
      case 'G':
        return 7;
      case 'G#':
        return 8;
      case 'A':
        return 9;
      case 'A#':
        return 10;
      case 'H':
        return 11;
      default:
        return null;
    }
  }

  const chordSheetRows = chordSheetCrdString.split('\n'); // TODO: what if there is \n\n

  const chordSheet = chordSheetRows.map((row) => {
    let captions = row.match(/{[^{}]+}/g);
    if (captions) {
      let captionsParsed = captions.map((caption: string, captionIdx: string) => {
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
          ( caption.startsWith('{c:') ||
            caption.startsWith('{ci:'))
        ) {
          const regexCaption = RegExp(/^\{[c|ci]{1,2}\:[ ]?(.*)\}$/, 'g');
          const captionMatch = regexCaption.exec(caption);
          let captionFormatted = captionMatch && captionMatch[1] ? captionMatch[1] : '';
          return (
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
                {captionFormatted} 
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
          <Text style={[chordLyricsStyles.chordsText, {fontSize: textSizes[0]}]}>{transpose(rowStart[0].slice(1,-2))}</Text>
        </View>
      ) : null}
    </View>
    <View style={chordLyricsStyles.lyricsWrapper}>
      <View style={chordLyricsStyles.lyrics}>
        <Text style={[chordLyricsStyles.lyricsText, {fontSize: textSizes[0]}]} > </Text>
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
          <Text style={[chordLyricsStyles.chordsText, {fontSize: textSizes[0]}]}>{transpose(chord[0].slice(1,-1))}</Text>
        </View>
      ) : null}
    </View>  }
    <View style={chordLyricsStyles.lyricsWrapper}>
      <View style={[chordLyricsStyles.lyrics, {minHeight: textSizes[0] + 8}]}>
        <Text style={[chordLyricsStyles.lyricsText, {fontSize: textSizes[0]}]}>{ lyrics[0] || ''}</Text>
      </View>
    </View>
  </View>)
  });

  const rowEndParsed = rowEnd ? (<View style={chordLyricsStyles.chordsLyricsWrapper}>
    <View style={chordLyricsStyles.chordsWrapper}>
      {chordsVisible ? (
        <View style={chordLyricsStyles.chord}>
          <Text style={[chordLyricsStyles.chordsText, {fontSize: textSizes[0]}]}>{transpose(rowEnd[0].slice(2,-1))}</Text>
        </View>
      ) : null}
    </View>
    <View style={chordLyricsStyles.lyricsWrapper}>
      <View style={chordLyricsStyles.lyrics}>
        <Text style={[chordLyricsStyles.lyricsText, {fontSize: textSizes[0]}]}> </Text>
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
    <SafeAreaView style={{paddingTop: insets.top, paddingBottom: 0, flex: 1, backgroundColor: '#fff'}}>
    <Animated.View style={{transform:[{translateY: headerTranslateY}, ], elevation: 4, zIndex: 100,}}>
      <Header title={songTitle} dark={true} />
    </Animated.View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingTop: 24 + 54, paddingBottom: 216  }} // TODO: adjust padding bottom based on button width and device screen; adjust padding top based on header height
        style={styles.scrollView}
        onScroll={(event) => {
          btScrollY.setValue(event.nativeEvent.contentOffset.y * 1.73);
          headerScrollY.setValue(event.nativeEvent.contentOffset.y);
        }}>
        <View style={styles.body}>
          <View style={chordLyricsStyles.lyricsContainer}>
           {chordSheet}
          </View>
        </View>
      </ScrollView>
      <Animated.View style={{transform:[{translateY: btTranslateY}]}}>
      <View style={styles.bottomTabs}>
<View style={styles.tab} ><InsetShadow containerStyle={styles.tabTouchable} elevation={chordsVisible ? 4 : 0} shadowOpacity={chordsVisible ? 0.4 : 0} shadowRadius={3} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'} onPress={() => {setChordsVisible(!chordsVisible)}}><Image style={{height: 24, width: 24, }} source={require('../assets/images/icon-guitar-white.png')}/></TouchableHighlight></InsetShadow></View>
{/* <View style={styles.tabDivider}></View> */}
<View style={styles.tab} ><InsetShadow containerStyle={[styles.tabTouchable, Platform.OS === 'android' && {borderLeftWidth: 1, borderLeftColor: '#44d480', }]} elevation={captionsVisible ? 4 : 0} shadowOpacity={captionsVisible ? 0.4 : 0} shadowRadius={3} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'}  onPress={() => {setCaptionsVisible(!captionsVisible)}}><Image style={{height: 16, width: 36}} source={require('../assets/images/icon-captions-white.png')}/></TouchableHighlight></InsetShadow></View>
<View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'}  onPress={() => {setChordsMajor(rotate(chordsMajor, 1, true))} } disabled={!chordsVisible}><Title style={[styles.btText, !chordsVisible && {opacity: 0.5}]}>-1</Title></TouchableHighlight></View>
<View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'}  onPress={() => {setChordsMajor(rotate(chordsMajor, 1))} } disabled={!chordsVisible} ><Title style={[styles.btText, !chordsVisible && {opacity: 0.5}]}>+1</Title></TouchableHighlight></View>
<View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'}  onPress={() => {setTextSizes(rotate(textSizes, 1))}}><Title style={styles.btText}>Aa</Title></TouchableHighlight></View>
      </View>
      </Animated.View>
    </SafeAreaView>
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
  captionWrapper: {alignItems: 'center', paddingVertical: 12, },
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
  bottomTabs: {
    position: 'absolute', 
    bottom: 20, 
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
  justifyContent: 'center', height: 64, width: 64, borderRadius: 14,  },
  tabDivider: {
    height: 36,
    width: 0.65,
    backgroundColor: '#fff',
    opacity: 0.6,
  },
  btText: {fontSize: 18, color: '#fff', fontWeight: 'bold'}
});

export default SongDetailScreen;
