import React, { useRef } from "react";
import { WebView } from "react-native-webview";

const subdomain = "demo"; // Replace with your custom subdomain

let isSubscribed = false;
let count = 0;
const correlationId = "a0bf9c2a-44d7-4882-8e72-4bc7ab73849f";

function OnAvatarExported(json) {
  alert(`Avatar Url = ${json.data?.url}`);
}

const View = () => {
  const webview = useRef();
  const subscribe = () => {
    if (isSubscribed) {
      return;
    }

    isSubscribed = true;
    webview.current.postMessage(
      JSON.stringify({
        target: "readyplayerme",
        type: "subscribe",
        eventName: "v1.avatar.exported",
      })
    );
  };

  const process = (data) => {
    const json = JSON.parse(data);

    if (json.source !== "readyplayerme") {
      return;
    }

    if (json.eventName === "v1.avatar.exported") {
      OnAvatarExported(json);
    }

    if (json.eventName !== "v1.subscription.deleted") {
      count++;

      if (count > 4) {
        webview.current.postMessage(
          JSON.stringify({
            target: "readyplayerme",
            type: "unsubscribe",
            correlationId,
          })
        );
      }
    }
  };

  return (
    <WebView
      ref={webview}
      source={{
        uri: `https://${subdomain}.readyplayer.me/avatar?frameApi`,
      }} // Change the source uri to your custom subdomain
      style={{ marginTop: 20 }}
      onLoad={subscribe}
      onMessage={(message) => process(message.nativeEvent.data)}
    />
  );
};

export default class App extends React.Component {
  render() {
    return <View />;
  }
}
