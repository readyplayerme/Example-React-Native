import * as React from "react";
import { WebView } from "react-native-webview";

const subdomain = "harrison-test"; // Replace with your custom subdomain

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
        source={{
          uri: `https://${subdomain}.readyplayer.me/avatar?frameApi`,
        }} // Change the source uri to your custom subdomain
        injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
        onMessage={(event) => {
          var data = JSON.parse(event.nativeEvent.data);
          if (data.readyPlayerMe?.name == "avatar.exported") {
            alert(`${data.readyPlayerMe?.data.avatarUrl}`);
          }
        }}
      />
    );
  }
}
