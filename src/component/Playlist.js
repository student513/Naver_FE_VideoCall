import React, { useState, useRef } from 'react';
import { useObserver } from 'mobx-react';
import useStore from '../useStore';
const getVideoId = require('get-video-id');
const getVideoTitle = require('get-youtube-title');

const Playlist = () => {
  const { videoListStore } = useStore();
  const [url, setUrl] = useState('');
  const nextId = useRef(0);

  const pushVideoList = (videoId, title, id) => {
    videoListStore.pushVideoList(videoId, title, id);
  };
  const setNowPlayId = (videoId) => {
    videoListStore.setNowPlayId(videoId);
  };
  const popVideoList = () => {
    videoListStore.popVideoList();
  };
  const onChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const onPushToList = () => {
    videoListStore.setShowPlayer(true);
    const videoId = getVideoId(url).id;
    getVideoTitle(videoId, function (err, title) {
      pushVideoList(videoId, title, nextId.current++);
    });
    setUrl('');
  };

  const skipNowVideo = () => {
    popVideoList();
    if (videoListStore.videoList.length) {
      setNowPlayId(videoListStore.videoList[0].videoId);
    }
  };

  return useObserver(() => (
    <div>
      {videoListStore.videoList.map((video) => (
        <p key={video.id}>{video.title}</p>
      ))}
      <input
        value={url}
        onChange={onChangeUrl}
        placeholder="동영상 링크를 입력하세요."
      />
      <button onClick={onPushToList}>제출</button>
      <button onClick={skipNowVideo}>다음 영상</button>
    </div>
  ));
};

export default Playlist;