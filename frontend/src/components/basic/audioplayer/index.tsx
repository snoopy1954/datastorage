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
  const dispatch = useDispatch();
 
    const [ maxTime, setMaxTime ] = useState('0:00'); 
    const [ curTime, setCurTime ] = useState('0:00');
    const [ trackname, setTrackname ] = useState('');
    const [ status, setStatus ] = useState('stopped');
//    const [ song, setSong ] = useState(new Audio());
    const [ index, setIndex ] = useState(0);

    const tracks: TrackToPlay[] = useSelector((state: RootState) => state.tracks);      

//    console.log(Object.values(tracks).length)

    const play = () => {
//      console.log(Object.values(tracks).length)
      if (Object.values(tracks).length>0) {
        const track: TrackToPlay = tracks[0];
        setTrackname(track.title);
        dispatch(removeTrack(track.id))
      }
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
    setInterval(play, 5000);

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

/**
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './styles.css'

import * as Icon from 'react-feather';

export default class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.togglePlay = this.togglePlay.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.chooseSong = this.chooseSong.bind(this);
    this.minimise = this.minimise.bind(this);
    this.audio = React.createRef();
    this.actualProgress = React.createRef();
    this.progress = React.createRef();
    this.state = {
      isPlaying: false,
      minimised: false,
      currentTime: 0,
      currentTrack: {name: '', artist: '', source: '', color: '#F2F2F2'},
      data: this.props.data,
      id: 0,
    }
  }

  static propTypes = {
    text: PropTypes.string
  }

  componentDidMount() {
    this.setState({
      currentTrack: this.state.data.tracks[0],
      id: 0,
    })
    this.audio.addEventListener('loadeddata', () => {
      this.setState({
        currentTime: this.audio.currentTime,
        duration: this.audio.duration,
      });
    });
    this.audio.addEventListener('timeupdate', () => {
      const currentTime = this.audio.currentTime;
      const duration = this.audio.duration;
      this.setState({
        currentTime: currentTime,
        duration: duration,
      });
      this.progress.value = currentTime/duration*100;
    });
    this.audio.addEventListener('ended', () => { 
      this.handleNext(); 
      this.togglePlay(); 
    });
  }

  handleProgress(event) {
    this.actualProgress.value = event.target.value;
    this.progress.value = event.target.value;
    this.audio.currentTime = (event.target.value*this.state.duration)/100;
  }

  togglePlay() {
    if (this.state.isPlaying===false) {
      this.setState({isPlaying: true});
      this.audio.play();
    } else {
      this.setState({isPlaying: false});
      this.audio.pause();
    }
  }

  minimise() {
    this.setState({
      minimised: !this.state.minimised,
    })
  }

  formatSeconds(s) {
    return (s-(s%=60))/60+(9<s?':':':0')+s;
  }

  chooseSong(number) {
    this.setState({
      currentTrack: this.state.data.tracks[number],
      isPlaying: false,
      id: number,
    }, ()=> {
      this.audio.pause();
      this.audio.load();
      this.progress.value = 0;
    })
  }

  handleNext() {
    if(this.state.id<this.state.data.tracks.length-1) {
      this.chooseSong(this.state.id+=1);
    }
  }

  handlePrev() {
    if(this.state.id>0) {
      this.chooseSong(this.state.id-=1);
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>

        <div className={styles.track}>
          <div className={styles.trackMeta}>
            <h1 className={styles.title}>
              {[...Array(7)].map((e, i) => i!==1 ? <span className={styles.title} key={i}>{this.state.currentTrack.name} {this.state.currentTrack.artist} </span> : <span className={styles.titleColored} key={i} style={{color: this.state.currentTrack.color}}>{this.state.currentTrack.name}<span className={styles.subtitleColored} style={{color: this.state.currentTrack.color}}> {this.state.currentTrack.artist} </span></span>)}
            </h1>
          </div>
        </div>

        <div className={styles.timestamp}>
          <div className={styles.time}>{this.state.currentTime ? this.formatSeconds(Math.floor(this.state.currentTime)) : '0:00'}</div>
          <div className={styles.time}>{Math.floor(this.state.duration) ? this.formatSeconds(Math.floor(this.state.duration)) : '0:00'}</div>
        </div>

        <div className={styles.player}>

          <progress className={styles.progress} value={this.state.duration ? (this.state.currentTime / this.state.duration) * 100 : 0} max='100' ref={(actualProgress) => { this.actualProgress = actualProgress }} style={{backgroundColor: this.state.currentTrack.color}}>15%</progress>
          <input type='range' step='0.1' onChange={this.handleProgress} min='0' max='100' defaultValue={0} className={styles.slider} ref={(progress) => { this.progress = progress }} />

          <div className={styles.playerIcons}>
            <div className={styles.icon} onClick={this.handlePrev}><Icon.SkipBack /></div>
            <div className={styles.icon} onClick={this.togglePlay} style={{display: this.state.isPlaying ? 'none' : 'inherit'}}><Icon.Play /></div>
            <div className={styles.icon} onClick={this.togglePlay} style={{display: this.state.isPlaying ? 'inherit' : 'none'}}><Icon.Pause /></div>
            <div className={styles.icon} onClick={this.handleNext}><Icon.SkipForward /></div>
          </div>

          <audio id='' title='' poster='' ref={(audio) => { this.audio = audio }}>
            <source src={this.state.currentTrack.source} type='audio/mpeg' />
          </audio>

          <div className={styles.playlistIcon} onClick={this.minimise} style={{display: this.state.minimised ? 'none' : 'inherit'}}><Icon.X /></div>
          <div className={styles.playlistIcon} onClick={this.minimise} style={{display: this.state.minimised ? 'inherit' : 'none'}}><Icon.List /></div>

        </div>

        <div className={styles.playlist} style={{display: this.state.minimised ? 'none' : 'inherit'}}>
          {
            this.state.data.tracks.map((song, id)=>{
              return (
                <div className={styles.playlistTrack} onClick={this.chooseSong.bind(null, id)} style={{background: this.state.currentTrack.name===song.name ? this.state.currentTrack.color : ''}}>
                  <div>{song.name} - {song.artist}</div>
                  <div>{}</div>
                </div>
              )
            })
          }
          
        </div>

      </div>
    )
  }
}


import React, { Component } from 'react'

import AudioPlayer from 'react-audioplaylist'
import * as Icon from 'react-feather';
import ReactJson from 'react-json-view'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tracks: [
          {
            name: 'Uncatena',
            artist: 'Sylvan Esso',
            source: 'https://storage.googleapis.com/jrmyphlmn/music/uncatena.mp3',
            color: '#F96300'
          },
          {
            name: 'Hold Me Down',
            artist: 'Dean Lewis',
            source: 'https://storage.googleapis.com/jrmyphlmn/music/hold%20me%20down.mp3',
            color: '#E62F0B'
          },
          {
            name: 'Only You',
            artist: 'Jim Charles Moody',
            source: 'https://storage.googleapis.com/jrmyphlmn/music/only%20you.mp3',
            color: '#4C1749'
          }
        ]
      }
    }
  }

  render () {
    return (
      <div className="universe">
        <div className="header"><Icon.Package class={'feather-icon'} size={32} />react-audioplaylist</div>
        <div className="meta">
          <div className="tag">v1.0.7</div>
          <a className="tag npm" href='https://www.npmjs.com/package/react-audioplaylist'>npm</a>
          <a className="tag github" href='https://github.com/jeremyphilemon/react-audioplaylist'>GitHub</a>
        </div>
        <div class="component-wrapper">
          <div className="tag preview">Preview</div>
          <AudioPlayer data={this.state.data} />
        </div>
        <div className="instructions">
          <div className="title">Installation</div>
            <blockquote><span className="shell">$</span>npm i react-audioplaylist</blockquote>
          <div className="title">Usage</div>
            <p>1. Import the component.</p>
            <blockquote>import AudioPlayer from 'react-audioplaylist'</blockquote>
            <p>2. Add the component and pass the track details as prop.</p>
            <blockquote>{`<AudioPlayer data={this.state.data} />`}</blockquote>
          <div className="title">Props Specification</div>
            <p>Here's the json specification used to pass as prop.</p>
            <ReactJson src={this.state.data} collapseStringsAfterLength={20} enableClipboard={false} style={{marginTop: '1rem', fontFamily: 'Apercu'}}/>
        </div>
        <div className="footer">
          <img src="https://jrmyphlmn.com/logo.png" />
          <p className="disclaimer">
            Songs used above are purely for demo purposes only.<br/> 
            I do not own them, respective songs belong to respective artists.
          </p>
        </div>
      </div>
    )
  }
}
 */