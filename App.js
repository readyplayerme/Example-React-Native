import * as React from "react";
import { WebView } from "react-native-webview";

const INJECTED_JAVASCRIPT = `
  window.addEventListener("message", Subscribe);
  document.addEventListener("message", Subscribe);

  function Subscribe(event){
    const json = parse(event);
    if (json?.source !== "readyplayerme") {
      return;
    }

    // Susbribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === "v1.frame.ready") {
      window.postMessage(
        JSON.stringify({
          target: "readyplayerme",
          type: "subscribe",
          eventName: "v1.**",
        }),
        "*"
      );
    }
  }

  function parse(event) {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  }`;

export default class App extends React.Component {
  render() {
    return (
      <WebView
        source={{ uri: "https://harrison-test.readyplayer.me/avatar?frameApi" }} // Change the source uri to your custom subdomain
        onMessage={(event) => {
          var data = JSON.parse(event.nativeEvent.data);
          if (data.readyPlayerMe?.name == "avatar.exported") {
            alert(`${data.readyPlayerMe?.data.avatarUrl}`);
          }
        }}
        javaScriptEnabled
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
      />
    );
  }
}
