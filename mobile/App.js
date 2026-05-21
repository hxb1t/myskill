import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArticleDetailScreen from "./src/screens/ArticleDetail";
import HomeScreen from "./src/screens/Home";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import VideoDetailScreen from "./src/screens/VideoDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    "Poppins-Regular": Poppins_400Regular,
    "Poppins-Bold": Poppins_700Bold,
    "Poppins-Medium": Poppins_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#F8F8FC" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        <Stack.Screen name="VideoDetail" component={VideoDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
