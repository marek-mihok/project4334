import React, { useState, FunctionComponent, HTMLAttributes } from 'react';
import { View, ScrollView, StyleSheet, Image, Animated, Platform, } from 'react-native';
import { Text, Title, useTheme, IconButton, List } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/src/types';
import Header from '../components/Header';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
import InsetShadow from 'react-native-inset-shadow'
import { StackNavigationProp } from '@react-navigation/stack';
import { MainParamList } from '../navigators/MainNavigator';
import { RouteProp } from '@react-navigation/native';
import { useAsyncStorage } from '../providers/AsyncStorageProvider';
import WebView from 'react-native-webview';

// TIP: https://medium.com/free-code-camp/a-first-look-at-firstborn-react-natives-new-component-library-51403077a632
// TIP: https://medium.com/@rossbulat/theming-in-react-native-explained-ac40d0d2e15c

// const songTitle = 'Verný Boh';
//const chordSheet = `{c: intro: 2x}\r\n\r\n[E][c#][A]\r\n\r\n{c: 1:}\r\n\r\n[E] Priblížiť sa k láske, [c#] ktorá seba [A]dáva\r\n[E] priblížiť sa k láske, [c#] ktorá všetko [A]žiada\r\n\r\n{c: prechorus:}\r\n\r\n[f#] Do [E/G#]svojej [H]prítomnosti [E/G#] zahaľ [A]nás\r\n[f#] a v [E/G#]tôni [H]svojich krídel [E/G#] ukry [A]nás\r\n\r\n{c: chorus:}\r\n\r\nVždy byť [E]blíz[H]ko, [c#][A] po tom [E]tú[H]žim[c#][A]\r\ntvoja [E]lás[H]ka [c#][A] je môj [E][c#]ú[H]kryt\r\n\r\n{c: Interlude}\r\n\r\n{c: 1}\r\n\r\n{c: prechorus}\r\n\r\n{c: chorus 2x}\r\n\r\n{c: interlude 2: 2x}\r\n\r\n[A][c#][A][E][H]\r\n\r\n{c: bridge: 6x}\r\n\r\nEmanu[f#]el, Emanu[c#]el\r\nEmanu[f#]el, Emanu[E][H]el\r\n\r\n{c: woah outro: 2x}\r\n\r\n[f#][c#][f#][E][H]`;
// const chordSheetCrdString = `{c: intro}{c: 1:}\n[h] Nemôžem [D]prestať [G]myslieť na teba [a]\n[h] nemôžem [D] sa ťa stria[G/F]sť\n[h] Si ako [D]oheň v mojom [G]vnútri, čo páli ma\n[h] p[D]áliš ma[G]\n{c: interlude: 2x}\n[e][G][C]\n{c: 1}{c: prechorus:}\n[e] Si [G]všetko, čo [C]chcem\n[e] Si [G]všetko, čo [C]mám\n[e] A aj keď [D]zdá sa, že sp[E][c#][H]íš\nja tvoje meno zavo[C]lám\nproti búrkam, proti tmám\n{c: chorus: 2x}\nSi [G]verný Boh a [D]verný Kráľ\n[e]dokončíš dielo, [C]ktoré si vo mne začal\n[G]Verný Boh a [D]verný Kráľ\n[e]nevzdáš sa snov, ktoré si [C]so mnou snívať začal\n{c: interlude}\n[G][D][e][C]\n{c: bridge: 4x}\n[G][Fmaj7] Ohlásim zo striech\nže [h]ľúbiš mňa a ja ľúbim teba\n[e] Ohlásim zo striech\nže si [C]verný a verný a verný Kráľ\n(si verný a verný Kráľ)\n{c: 1}{c: interlude}{c: 1}{c: prechorus}{c: chorus 2x}{c: interlude}{c: bridge 4x}{c: bridge 2: 4x}\nSi verný [G]Kráľ\nWoa[h]h\nSi verný [e]Kráľ\nWoa[C]h\n{c: outro}`;

// TODO: fix iOS vertical align issue
// TODO: remove empty spaces left when chords and captions are turned off 
// TODO: Dno - kurziva font!
// TODO: zobrazit prazdne riadky, napriklad pred samostatnymi akordami bez textu

// TODO: spotify support
// TODO: disable scroll animations when text does not overflow screen
// TODO: horizontal line under multiple chords
// TODO: check if highlighted active bottom tabs work properly on all devices
// TODO: finish transposition: transpo indicator, transpo clear
// TODO: QR Code playlist share
// TODO: Double tap for showing chords
// TODO: Optimize performance by not re-computing the song component when showing/hiding chords/captions, but base it just on child component's visibility
// TODO: handle app when no connection to network 

type Props = {
  navigation: StackNavigationProp<MainParamList, 'SongDetail'>;
  route: RouteProp<MainParamList, 'SongDetail'>;
  theme: Theme;
}

const SongDetailScreen: FunctionComponent<Props> = ({ route, navigation }) => {
  const
    [chordsVisible, setChordsVisible] = useState(false),
    [captionsVisible, setCaptionsVisible] = useState(false),
    insets = useSafeArea(),
    { songId } = route.params,
    { state } = useAsyncStorage(),
    { colors } = useTheme(),
    { songs, albums, artists } = state,
    [isInfoExpanded, setIsInfoExpanded] = useState(false),
    song = songs[songId],
    album = albums[song.album],
    artist = artists[album.artist],
    [textSizes, setTextSizes] = useState([16, 19, 22, 25]),
    [chordsMajor, setChordsMajor] = useState<string[]>(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'H'])

  if (song === undefined) navigation.goBack()

  const
    songTitle = song?.title,
    chordpro = song?.chordpro,
    albumTitle = album?.title,
    artistTitle = artist?.title


  const
    metaSpotifyUrl = song?.spotify,
    metaYoutubeUrl = song?.video,
    chordSheetCrdString = chordpro?.startsWith('[chordwp]') ? chordpro.substring(9, chordpro.length - 10) : chordpro // TODO: check if all cases are handled

  console.log(song)

  const meta = [
    { decription: song?.tempo + " BPM", value: song?.tempo },
    { decription: song?.key, value: song?.key },
    { decription: "Capo " + song?.capo, value: song?.capo }
  ]

  const metaExtended = [
    { decription: "Referencia", value: song?.bible_ref },
    { decription: "Text", value: song?.text },
    { decription: "Orignál", value: song?.original },
    { decription: "Preklad", value: song?.translation }
  ]

  // animation for bottom tabs
  const btScrollY = new Animated.Value(0)
  const btDiffClamp = Animated.diffClamp(btScrollY, 0, 100)
  const btTranslateY = btDiffClamp.interpolate({ inputRange: [0, 100], outputRange: [0, 100] })

  // animation for header
  const headerScrollY = new Animated.Value(0)
  const headerDiffClamp = Animated.diffClamp(headerScrollY, 0, 62 + insets.top)
  const headerTranslateY = headerDiffClamp.interpolate({ inputRange: [0, 62 + insets.top], outputRange: [0, -62 - insets.top] })


  const rotate = (array: any[], times: number, reverse: boolean = false) => {
    array = array.slice();
    while (times--) {
      if (reverse) array.unshift(array.pop());
      else array.push(array.shift())
    }
    return array;
  }

  const transpose = (chord: string) => {
    if (chord.includes('/')) {
      const chordSplit = chord.split('/');
      return transpose(chordSplit[0]) + '/' + transpose(chordSplit[1]);
    }
    let toneExtracted = chord.match(/^[a-zA-Z][#]?/g) || chord.charAt(0);
    let chordTone: string = toneExtracted && toneExtracted[0];
    let chordIndex: number | null = getChordIndex(chordTone);
    let isMajor: boolean = (chordTone.charCodeAt(0) >= 65 && chordTone.charCodeAt(0) <= 90);
    if (chordIndex !== null) {
      let chordToneTransposed = isMajor ? chordsMajor[chordIndex] : chordsMajor[chordIndex].toLowerCase();
      return chordToneTransposed + chord.slice(toneExtracted[0].length || 1);
    } else {
      return chord;
    }
  }

  const getChordIndex = (chordTone: string) => {
    switch (chordTone.toUpperCase()) {
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

  const chordSheet = chordSheetRows.map((row, idx) => {
    let captions = row.match(/{[^{}]+}/g)?.filter(row => !row.includes('{ci:')); // TODO: reimplement just to exclude "ci:" not everything with "i"; solve intalic on level of text view https://regex101.com/r/1RHFPt/1    /\{ci:.*?\}/g
    if (captions && captions.length === 0) captions = undefined // TODO: handle in previous line

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
          (caption.startsWith('{c:'))
        ) {
          const regexCaption = RegExp(/^\{[c]{1,2}\:[ ]?(.*)\}$/, 'g');
          const captionMatch = regexCaption.exec(caption);
          let captionFormatted = captionMatch && captionMatch[1] ? captionMatch[1] : '';
          return (
            <View
              key={captionIdx + 'view'}
              style={chordLyricsStyles.captionWrapper}>
              <Text
                key={captionIdx + 'text'}
                style={[
                  chordLyricsStyles.caption, { fontSize: textSizes[0] },
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

    if (!chordsVisible && row.match(/^(?:\[[^\]]*\])+(\\r)?$/gm)) {
      return null;
    }

    if (row === '\r' && chordSheetRows[idx + 2] === '\r' && chordSheetRows[idx - 2] === '\r') {
      return null; // TODO:
    }

    const splitTextBlocks = (text) => {
      if (!text) return null;
      const regex = /\{ci:(.*?)\}/g;
      let result = text.replace(regex, (match, blockContent) => {
        return `{ci:${blockContent.split('[').join('}[').split(']').join(']{ci:').replace('{ci:}', '')}}`;
      });

      return result;
    };

    const middleRowProcessed = splitTextBlocks(row);

    // TODO: replace \n's in row with empty row
    const rowStart = row.match(/^\[[^\[\]]+\][ ]/g);
    const rowEnd = row.match(/[ ]\[[^\[\]]+\]$/g);
    const rowMiddle = middleRowProcessed?.replace(/^\[[^\[\]]+\][ ]/g, '').replace(/[ ]\[[^\[\]]+\]$/g, '')?.match(/(\[[^\[\]]*\])?[^\[]*/g)?.filter(rowPart => rowPart !== '');


    const rowStartParsed = rowStart ? (<View style={chordLyricsStyles.chordsLyricsWrapper}>
      <View style={chordLyricsStyles.chordsWrapper}>
        {chordsVisible ? (
          <View style={chordLyricsStyles.chord}>
            <Text style={[chordLyricsStyles.chordsText, { fontSize: textSizes[0] }]}>{transpose(rowStart[0].slice(1, -2))}</Text>
          </View>
        ) : null}
      </View>
      <View style={chordLyricsStyles.lyricsWrapper}>
        <View style={chordLyricsStyles.lyrics}>
          <Text style={[chordLyricsStyles.lyricsText, { fontSize: textSizes[0] }]} > </Text>
        </View>
      </View>
    </View>) : null;

    const rowMiddleParsed = rowMiddle?.map((row, idx) => {
      let chord = row.match(/(\[[^\[\]]*\])/g);
      let lyrics = row.match(/[^\[\]]*(?![^\[\]]*\])/g)?.filter(word => word !== "");

      return (
        <View key={`key-${lyrics?.[0]}-${idx}-${chord?.[0]}`} style={chordLyricsStyles.chordsLyricsWrapper}>
          {chord && <View style={chordLyricsStyles.chordsWrapper}>
            {chordsVisible ? (
              <View style={chordLyricsStyles.chord}>
                <Text style={[chordLyricsStyles.chordsText, { fontSize: textSizes[0] }]}>{transpose(chord[0].slice(1, -1))}</Text>
              </View>
            ) : null}
          </View>}
          <View style={chordLyricsStyles.lyricsWrapper}>
            <View style={[chordLyricsStyles.lyrics, { minHeight: textSizes[0] + 8 }]}>
              <Text style={[chordLyricsStyles.lyricsText, { fontSize: textSizes[0], height: 8 + textSizes[0] }]}>{
                // TODO: Add Montserrat Italic font into react native paper.
                lyrics?.[0]?.split(/(\{ci:.*?\})/g).map(text => {
                  if (text.startsWith('{ci:')) return <Text style={{ fontStyle: 'italic' }}>{text.slice(4, -1)}</Text>
                  else return text || ''
                })

              }
              </Text>
            </View>
          </View>
        </View>)
    });

    // TODO: Reduce redundant empty rows.
    // if(!rowStart && !rowEnd && rowMiddle?.[0] === '\r'){return}

    const rowEndParsed = rowEnd ? (<View style={chordLyricsStyles.chordsLyricsWrapper}>
      <View style={chordLyricsStyles.chordsWrapper}>
        {chordsVisible ? (
          <View style={chordLyricsStyles.chord}>
            <Text style={[chordLyricsStyles.chordsText, { fontSize: textSizes[0] }]}>{transpose(rowEnd[0].slice(2, -1))}</Text>
          </View>
        ) : null}
      </View>
      <View style={chordLyricsStyles.lyricsWrapper}>
        <View style={chordLyricsStyles.lyrics}>
          <Text style={[chordLyricsStyles.lyricsText, { fontSize: textSizes[0] }]}> </Text>
        </View>
      </View>
    </View>) : null;


    return (
      <View style={chordLyricsStyles.rowWrapper}>
        {rowStartParsed}
        {rowMiddleParsed}
        {rowEndParsed}
      </View>
    );
  });

  interface SpotifyProps extends HTMLAttributes<HTMLIFrameElement> {
    [key: string]: any

    link: string
    wide?: boolean
    width?: number | string
    height?: number | string
    frameBorder?: number | string
    allow?: string
  }

  const DotDelimiter = ({ horizontalPadding }: { horizontalPadding?: number }) => <View style={{ ...{ flexDirection: 'row', alignItems: 'center' }, ...{ paddingHorizontal: horizontalPadding } }}><Text style={{ color: colors.disabled, fontSize: 3 }}>●</Text></View>

  return (
    <SafeAreaView style={{ paddingTop: insets.top, paddingBottom: 0, flex: 1, backgroundColor: '#fff' }}>
      <Animated.View style={{ transform: [{ translateY: headerTranslateY },], elevation: 4, zIndex: 100, }}>
        <Header title={songTitle} dark={true} />
      </Animated.View>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ paddingTop: 24 + 54, paddingBottom: 216 }} // TODO: adjust padding bottom based on button width and device screen; adjust padding top based on header height
        style={styles.scrollView}
      >
        <TouchableHighlight onPress={() => {
          btScrollY.setValue(btScrollY?._value === 100 ? 0 : 100);
          headerScrollY.setValue(headerScrollY?._value === 107.26 ? 0 : 107.26);
        }}
          underlayColor="transparent"
        >
          <View style={styles.body}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 2, paddingBottom: 2 }}>
              {artistTitle ? <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconButton icon="microphone" size={18} color={colors.disabled} />
                <Text style={{ color: colors.disabled, fontWeight: '400', paddingRight: 12 }}>{artistTitle}</Text>
              </View> : null}
              {albumTitle ?
                <>
                  <DotDelimiter />
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <IconButton icon="album" size={18} color={colors.disabled} />
                    <Text style={{ color: colors.disabled, fontWeight: '400' }}>{albumTitle}</Text>
                  </View>
                </>
                : null}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: '#F5F5F5', padding: 12, alignItems: 'center' }}>
              {meta.map((m, idx) => {
                return m.value ? <>
                  {idx !== 0 ? <DotDelimiter horizontalPadding={12} /> : null}
                  <Text style={{ color: colors.primary, fontWeight: '700' }}>{m.decription}</Text>
                </> : null
              })}
            </View>

            <TouchableOpacity onPress={() => { setIsInfoExpanded(v => !v) }}>
              <List.Accordion title="Viac informácií" titleStyle={{ fontWeight: '400', fontSize: 14 }} expanded={isInfoExpanded}>
                <View style={{ padding: 16, paddingTop: 0 }}>
                  {metaExtended.map(meta => {
                    if (!meta.value) return;
                    return <View style={{ flexDirection: 'row', paddingTop: 2, paddingBottom: 2 }}>
                      <Text style={{ fontWeight: '400', flex: 1 }}>
                        {`${meta.decription}:`}
                      </Text>
                      <Text style={{ color: colors.primary, fontWeight: '700', flex: 3 }}>
                        {meta.value}
                      </Text>
                    </View>
                  })}
                </View>
              </List.Accordion>
            </TouchableOpacity>

            <View >
              {metaSpotifyUrl &&
                <WebView
                  scalesPageToFit={true}
                  bounces={false}
                  javaScriptEnabled
                  style={{ height: 85, width: '100%' }}
                  source={{
                    html: `
                  <!DOCTYPE html>
                  <html>
                    <head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                    <body style="margin: 0;">
                        <iframe
                        title="Spotify Web Player"
                        src="https://open.spotify.com/embed${metaSpotifyUrl.replace('https://open.spotify.com', '')}&utm_source=oembed"
                        width='100%'
                        height='80'
                        frameBorder="0"
                        allow-fullscreen
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        style="border-radius: 12px;"
                      />
                    </body>
                  </html>
            `,
                  }}
                  automaticallyAdjustContentInsets={false}
                />
              }
              {metaYoutubeUrl &&
                <WebView
                  scalesPageToFit={true}
                  bounces={false}
                  javaScriptEnabled
                  style={{ height: 280, width: '100%' }}
                  source={{
                    html: `
                  <!DOCTYPE html>
                  <html>
                    <head><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
                    <body style="margin: 0;">
                        <iframe 
                        title="Youtube Web Player" 
                        width="100%" 
                        height="281" 
                        src="https://www.youtube.com/embed/${metaYoutubeUrl.replace('https://www.youtube.com/watch?v=', '')}?feature=oembed" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowfullscreen=""
                        />
                    </body>
                  </html>
            `,
                  }}
                  automaticallyAdjustContentInsets={false}
                />
              }
            </View>
            <View style={chordLyricsStyles.lyricsContainer}>
              {chordSheet}
            </View>
          </View>
        </TouchableHighlight>
      </ScrollView>
      <Animated.View style={{ transform: [{ translateY: btTranslateY }] }}>
        <View style={styles.bottomTabs}>
          <View style={styles.tab} ><InsetShadow containerStyle={styles.tabTouchable} elevation={chordsVisible ? 4 : 0} shadowOpacity={chordsVisible ? 0.4 : 0} shadowRadius={3} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'} onPress={() => { setChordsVisible(!chordsVisible) }}><Image style={{ height: 24, width: 24, }} source={require('../assets/images/icon-guitar-white.png')} /></TouchableHighlight></InsetShadow></View>
          <View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'} onPress={() => { setChordsMajor(rotate(chordsMajor, 1, true)) }} disabled={!chordsVisible}><Title style={[styles.btText, !chordsVisible && { opacity: 0.5 }]}>-1</Title></TouchableHighlight></View>
          <View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'} onPress={() => { setChordsMajor(rotate(chordsMajor, 1)) }} disabled={!chordsVisible} ><Title style={[styles.btText, !chordsVisible && { opacity: 0.5 }]}>+1</Title></TouchableHighlight></View>
          {/* <View style={styles.tabDivider}></View> */}
          <View style={styles.tab} ><InsetShadow containerStyle={[styles.tabTouchable, Platform.OS === 'android' && { borderLeftWidth: 1, borderLeftColor: '#44d480', }]} elevation={captionsVisible ? 4 : 0} shadowOpacity={captionsVisible ? 0.4 : 0} shadowRadius={3} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'} onPress={() => { setCaptionsVisible(!captionsVisible) }}><Image style={{ height: 16, width: 36 }} source={require('../assets/images/icon-captions-white.png')} /></TouchableHighlight></InsetShadow></View>
          <View style={styles.tab} ><TouchableHighlight style={styles.tabTouchable} underlayColor={'rgba(255,255,255,0.4)'} onPress={() => { setTextSizes(rotate(textSizes, 1)) }}><Title style={styles.btText}>Aa</Title></TouchableHighlight></View>
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
    // borderColor: 'red', // TODO: REMOVE
    // borderWidth: 1 // TODO: REMOVE
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
  captionWrapper: { alignItems: 'center', paddingVertical: 12, },
  caption: {
    color: '#bbb',
    textTransform: 'uppercase',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '400',
  },
  captionItalic: { fontStyle: 'italic' },
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
  tabTouchable: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center', height: 64, width: 64, borderRadius: 14,
  },
  tabDivider: {
    height: 36,
    width: 0.65,
    backgroundColor: '#fff',
    opacity: 0.6,
  },
  btText: { fontSize: 18, color: '#fff', fontWeight: 'bold' }
});

export default SongDetailScreen;
