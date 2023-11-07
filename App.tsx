/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Crashes, {ErrorAttachmentLog} from 'appcenter-crashes';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    (async () => {
      const enabled = await Crashes.isEnabled();
      console.log('sdjfhdjfhsd', enabled);
    })();

    Crashes.setListener({
      // onBeforeSending: function (report) {
      //   console.log('sdjfhdjfhsd', report);
      //   // called after Crashes.process and before sending the crash.
      // },
      // onSendingSucceeded: function (report) {
      //   console.log('sdjfhdjfhsd', report);
      //   // called when crash report sent successfully.
      // },
      onSendingFailed: function (report) {
        console.log('sdjfhdjfhsd', report);
        // called when crash report couldn't be sent.
      },
      getErrorAttachments: function (report): ErrorAttachmentLog[] {
        const textAttachment: ErrorAttachmentLog =
          ErrorAttachmentLog.attachmentWithText(
            'Hello text attachment!',
            'hello.txt',
          );
        const binaryAttachment: ErrorAttachmentLog =
          ErrorAttachmentLog.attachmentWithBinary(
            `${report}`,
            'logo.png',
            'image/png',
          );
        return [textAttachment, binaryAttachment];
      },
      // Other callbacks must also be defined at the same time if used.
      // Default values are used if a method with return parameter isn't defined.
    });
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <TouchableOpacity
          onPress={() => Crashes.generateTestCrash()}
          style={{
            backgroundColor: 'gray',
            paddingVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Crash</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
