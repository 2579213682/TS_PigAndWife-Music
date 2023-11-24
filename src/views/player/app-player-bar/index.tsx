import React, { memo, useEffect, useState, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { Link } from 'react-router-dom'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { ShallowEqualApp, useAppSelector } from '@/store'
import { formatTime, getImageSize } from '@/utils/format'
import { getSongPlayUrl } from '@/utils/handle-player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  // 组件内部定义的数据
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  // 从redux中获取数据

  const { currentSong } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong
    }),
    ShallowEqualApp
  )

  // 组件内的副作用操作
  useEffect(() => {
    // 1.播放音乐
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
        console.log('歌曲播放成功')
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log('歌曲播放失败', err)
      })
    // 2.获取音乐的总时长
    setDuration(currentSong.dt)
  }, [currentSong])

  // 音乐播放的进度处理
  function handleTimeUpdate() {
    // console.log('handleTimeUpdate', audioRef.current!.currentTime)
    // 1.获取当前的播放时间
    const currentTime = audioRef.current!.currentTime * 1000
    // 2.计算当前歌曲进度
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
      setIsSliding(false)
    }
  }

  // 组件内部的事件处理
  function handlePlayBtnClick() {
    // 1.控制播放器的播放/暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    // 2.改变isPlaying的状态
    setIsPlaying(!isPlaying)
  }

  function handleSliderChanging(value: number) {
    // 0.目前是处于拖拽状态
    setIsSliding(true)

    // 1.设置progress
    setProgress(value)
    // 2.设置value对应位置的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  function handleSliderChanged(value: number) {
    // 1.获取点击设置的时间
    const currentTime = (value / 100) * duration
    // 2.设置当前播放的时间
    audioRef.current!.currentTime = currentTime / 1000

    // 3.currentTime/progress
    setCurrentTime(currentTime)
    setProgress(value)
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button className="btn sprite_playbar prev"></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button className="btn sprite_playbar next"></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/player">
            <img src={getImageSize(currentSong?.al?.picUrl, 34)} alt="" />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* Slider组件 */}
              <Slider
                step={0.2}
                value={progress}
                onChange={handleSliderChanging}
                onAfterChange={handleSliderChanged}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
