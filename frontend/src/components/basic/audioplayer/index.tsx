import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, Icon } from 'semantic-ui-react';
import { styleButton }from '../../../constants';

import { TrackToPlay } from '../../../types/music';

import { RootState } from '../../../state/store';
import { addTrack, removeTrack, exchangeTracks } from '../../../state/music/tracks/actions';

import { secondsToMinutes, toUrl } from '../../../utils/basic/basic';
import { mp3BaseUrl } from '../../../constants';


/**
var sndLetItSnow = new Audio("audio/letItSnow.m4a"),
    sndSanta = new Audio("audio/snow.m4a"),
    playlist = [sndLetItSnow, sndSanta],
    current = null,
    idx = 0;

  function playSound() {
      if (current === null || current.ended) {
          // go to next
          current = playlist[idx++];

          // check if is the last of playlist and return to first
          if (idx >= playlist.length)
              idx = 0;

           // return to begin
           current.currentTime=0;

           // play
           current.play();
      }

  }

  setInterval(playSound, 1000);
 */

export const Audioplayer: React.FC = () => {  
    const [ maxTime, setMaxTime ] = useState('0:00'); 
    const [ curTime, setCurTime ] = useState('0:00');
    const [ trackname, setTrackname ] = useState('');
    const [ status, setStatus ] = useState('stopped');
//    const [ song, setSong ] = useState(new Audio());
    const [ index, setIndex ] = useState(0);

    const tracks: TrackToPlay[] = useSelector((state: RootState) => state.tracks);      

    console.log(Object.values(tracks).length)

    const play = () => {
        console.log(Object.values(tracks).length)

//         const track = tracks[index];
//         const path = toUrl(mp3BaseUrl, track.path);
//         const current = new Audio(path);
// //        setSong(current);
//         setTrackname(track.title);
//         setStatus('playing');
//         current.play();
//         setIndex(index+1)
//         current.addEventListener('loadedmetadata', () => {
//             setMaxTime(secondsToMinutes(current.duration.toFixed(0)));
//         }, false);
//         current.addEventListener('timeupdate', () => {
//             const currentTime = secondsToMinutes(current.currentTime.toFixed(0));
//             setCurTime(currentTime);
//         }, false);
    };
    setInterval(play, 10000);

    const control = (fct: string) => {
        switch (fct) {
            case 'play':
                // if (status==='stopped') {
                     play();
                // }
                break;
            case 'pause':
                // switch (status) {
                //     case 'playing':
                //         setStatus('paused');
                //         song.pause();
                //         break;
                //     case 'paused':
                //         setStatus('playing');
                //         song.play();
                //         break;
                //     default:
                //         break;
                // }
                break;
            case 'stop':
                // setStatus('stopped');
                // song.pause();
                // song.currentTime = 0;
                break;
            default:
        }
    }

//    console.log('tracks', tracks, Object.values(tracks).length)

    return (
        <>
            <Button type="button"  onClick={() => control('prev')}><Icon name='step backward'/></Button>
            <Button type="button"  onClick={() => control('play')}><Icon name='play'/></Button>
            <Button type="button"  onClick={() => control('pause')}><Icon name='pause'/></Button>
            <Button type="button"  onClick={() => control('stop')}><Icon name='stop'/></Button>
            <Button type="button"  onClick={() => control('next')}><Icon name='step forward'/></Button>
            <Button type="button"  onClick={() => control('eject')}><Icon name='eject'/></Button>
            <Button type="button"  onClick={() => control('more')}><Icon name='volume up'/></Button>
            <Button type="button"  onClick={() => control('less')}><Icon name='volume down'/></Button>
            <Button type="button"  onClick={() => control('mute')}><Icon name='volume off'/></Button>
            es sind {Object.values(tracks).length} Stücke ausgewählt
            {trackname} -- {curTime} / {maxTime}
        </>
    );
}
    
export default Audioplayer;