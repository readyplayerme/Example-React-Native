import React, { useRef } from "react";
import WebView from 'react-native-webview';

// Replace with your custom subdomain
const subdomain = "demo";

export default function App() {
  const webView = useRef();

  function onAvatarUrlReceived(message) {
    alert(`Avatar Url = ${message.data?.url}`);
  }

  function onWebViewLoaded() {
    webView.current.postMessage(
      JSON.stringify({
        target: "readyplayerme",
        type: "subscribe",
        eventName: "v1.avatar.exported",
      })
    );
  }

  function onMessageReceived(message) {
    const data = message.nativeEvent.data;
    const json = JSON.parse(data);

    if (json?.source !== 'readyplayerme') {
      return;
    }

    if (json.eventName === "v1.avatar.exported") {
      onAvatarUrlReceived(json);
    }
  }

  return (
    <WebView
      ref={webView}
      style={{ marginTop: 30 }}
      onLoad={onWebViewLoaded}
      onMessage={onMessageReceived}
      source={{ uri: `https://${subdomain}.readyplayer.me/avatar?frameApi&source=react-native-avatar-creator` }}
    />
  );
}
