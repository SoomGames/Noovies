import AppLoading from 'expo-app-loading';
import React, { useState } from 'react';
import { Text, Image } from 'react-native';
import { Asset,  } from 'expo-asset';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [ready, setReady] = useState(false);
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    //# 데이터베이스 초기화

    //# 사용자 데이터 로드

    const fonts = loadFonts([Ionicons.font]);
    const images = loadImages([
      require("./appIcon.png"),
      "https://reactnative.dev/img/oss_logo.png",
    ]);

    await Promise.all([...fonts, ...images]);
  };
  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.log} />;
  }
  return <Text>we are done!</Text>;
}