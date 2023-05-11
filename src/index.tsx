import React, { useRef } from "react"
import ReactDOM from 'react-dom'

import './index.css'
import "@castlabs/prestoplay/clpp.styles.css"

// @ts-ignore
import {clpp} from "@castlabs/prestoplay"
import "@castlabs/prestoplay/cl.mse"
import "@castlabs/prestoplay/cl.dash"
import "@castlabs/prestoplay/cl.htmlcue"
import "@castlabs/prestoplay/cl.ttml"


export const App = () => {
  const playerRef = useRef<any|null>(null)

  const createPlayer = (video: any) => {
    // Instantiate PRESTOplay player
    playerRef.current = new clpp.Player(video, {})
    playerRef.current.use(clpp.dash.DashComponent)
    playerRef.current.use(clpp.htmlcue.HtmlCueComponent)
    playerRef.current.use(clpp.ttml.TtmlComponent)
  }

  const pause = () => {
    playerRef.current.pause()
  }

  const play = async () => {
    const config = {
      source: 'https://castlabs-dl.s3.eu-west-1.amazonaws.com/public/SUPPORT/DE-2161/IFE-HHD10.mpd',
      autoplay: true,
    }

    // Play the video
    console.info('Playing with config: ', config)
    await playerRef.current.load(config)

    // Change subtitles to german, which contains italics
    const trackManager = playerRef.current.getTrackManager()
    const textTracks = await trackManager.getTextTracks()
    console.log('All subtitle tracks:', textTracks)
    const germanTrack = textTracks.find((track: any) => track.language === 'de')
    console.log('Set subtitles to German:', germanTrack)
    trackManager.setTextTrack(germanTrack)
  }

  /**
   * PRESTOplay will wrap the video element with a div container
   * and append subtitle viewport to it.
   * 
     <div class="clpp-container clpp-video-0 clpp-video-1">
       <video/>
       <div class="clpp-text-container clpp-text-ttml">...</div>
     </div>
   *
   * Make sure none of the clpp-* classes are removed or overridden by CSS.
   * 
   * In case of React/Vue/Angular make sure that re-rendering does not
   * accidentally remove these classes.
   * 
   * 
   * In this example, the styles applied to the subtitles can be 
   * debugged by running the following in the browser console:
   * 
   * ```
   * document.getElementsByTagName('style')[2].sheet.rules
   * ```
   */
  return (
    <>
      <video
        ref={createPlayer}
        autoPlay
        style={{
          width: 600,
          height: 400,
          border: '10px solid yellow'
        }}
      />
      <div className={"options"}>
        <label>
          <button onClick={play}>Play</button>
          <button onClick={pause}>Pause</button>
        </label>
      </div>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') as HTMLElement,
)
