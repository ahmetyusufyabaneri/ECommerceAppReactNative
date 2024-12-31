import {SafeAreaView} from 'react-native';
import Routes from './src/routes/Routes';
import {NavigationContainer} from '@react-navigation/native';
import ToastManager from 'toastify-react-native';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <ToastManager />
        <Routes />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
