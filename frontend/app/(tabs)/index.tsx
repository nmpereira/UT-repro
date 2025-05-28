import { UploadButtonComponent } from '@/components/UploadThing';
import { backendUrl } from '@/constants/url';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {

  const [stringFromServer, setStringFromServer] = useState("");

  useEffect(() => {
    fetch(`${backendUrl}/api/test`)
      .then(res => res.json())
      .then(data => setStringFromServer(data.message));
  }, []);

  return (
    <View>
      <Text>Hello world! StringFromServer: {stringFromServer}</Text>
      <UploadButtonComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
