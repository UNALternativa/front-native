import { StyleSheet,TextInput } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function Register({ navigation }: RootTabScreenProps<'Login'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Email</Text>
      <TextInput style={styles.input}/>
      <Text style={styles.title}>Name</Text>
      <TextInput style={styles.input}/>
      <Text style={styles.title}>Password</Text>
      <TextInput style={styles.input}/>
      <Text style={styles.title}>Confirm Password</Text>
      <TextInput style={styles.input}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 11,
  },
});
