import * as React from 'react'
import { WebView } from 'react-native-webview'

export default class App extends React.Component {
  render() {
    return (
      <WebView
        source={{ uri: 'https://vr.readyplayer.me/avatar' }} // Change the source uri to your custom subdomain
        onMessage={(event) => {
          alert(
            `Avatar 3D model can be downloaded from: ${event.nativeEvent.data}`
          )
        }}
      />
    )
  }
}
