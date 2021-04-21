import React, { useEffect, useRef, useState } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import { ModalWindowStyled } from '@/components/common/modal/Modal'
import ModalBox, { ModalBoxStyled } from '@/components/common/modal/ModalBox'
import Icon, { IconStyled } from '@/components/ui/Icon'
import {
  changeIsShowModal,
  $isVideo,
  changeIsVideo,
  $isAudio,
  changeIsAudio
} from '@/components/common/modal/call-process/CallProcess.model'

const ModalReStyled = styled(ModalWindowStyled)`
  min-height: 700px;
  min-width: 720px;
  ${ModalBoxStyled} {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.rgb(props.theme.colors.black)};
    padding: 40px 20px;
    border-radius: 0px;
  }
  use {
    fill: ${(props) => props.theme.rgb(props.theme.colors.white)};
  }
  &:hover {
    use {
      fill: ${(props) => props.theme.rgb(props.theme.colors.white)};
    }
  }
`
const ControllerStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`
const RoundButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
`
const GreyButtonStyled = styled(RoundButton)`
  background-color: ${(props) => props.theme.rgb(props.theme.colors.grey9)};
  margin-right: 10px;
`
const RedButtonStyled = styled(RoundButton)`
  background-color: ${(props) => props.theme.rgb(props.theme.colors.red)};
`
const MainVideoStyled = styled.div`
  width: 80%;
  height: calc(100% - 70px);
  border-radius: 8px;
  margin-bottom: auto;
  position: relative;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.grey9)};
`
const VideoWrapperStyled = styled.div<{ isMain: boolean }>`
  position: absolute;
  border-radius: 8px;
  right: ${(props) => props.isMain ? '0' : '20px'};
  bottom: ${(props) => props.isMain ? '0' : '20px'};
  width: ${(props) => props.isMain ? '100%' : '200px'};
  height: ${(props) => props.isMain ? '100%' : '130px'};
  border: ${(props) => props.isMain ? 'none' : `1px solid ${props.theme.rgb(props.theme.colors.white)}`};
  background-color: ${(props) => props.theme.rgba(props.theme.colors.grey9, props.isMain ? 0 : 1)};
  cursor: ${(props) => props.isMain ? 'default' : 'pointer'};
  z-index: ${(props) => props.isMain ? '1' : '2'};
`
const VideoStyled = styled.video`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`
const WrapperLabelStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 10px;
`
const LabelStyled = styled.p`
  color: ${(props) => props.theme.rgb(props.theme.colors.white)};
  user-select: none;
  outline: none;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;
`
const CallModal: React.FC = () => {
  const videoElement = useRef(null)
  const isVideo = useStore($isVideo)
  const isAudio = useStore($isAudio)
  const [role, setRole] = useState('main')
  const addStream = (stream: any) => {
    const video = videoElement?.current as HTMLVideoElement | null
    if (video) {
      // @ts-ignore
      window.stream = stream
      video.srcObject = stream
      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
    }
  }
  const closeStream = () => {
    // @ts-ignore
    window.stream.getAudioTracks().forEach((track: any) => {
      track.stop()
    })
    // @ts-ignore
    window.stream.getVideoTracks().forEach((track: any) => {
      track.stop()
    })
    // @ts-ignore
    window.stream = null
    changeIsShowModal(false)
  }
  // useEffect(() => {
  //   navigator.mediaDevices.getUserMedia({
  //     video: true,
  //     audio: true,
  //   }).then(stream => {
  //     addStream(stream)
  //   })
  //   return () => {
  //     const video = videoElement?.current as HTMLVideoElement | null
  //     if (video) video.srcObject = null
  //   }
  // }, [])
  return (
    <ModalReStyled>
      <ModalBox showClose={false} closeModal={() => closeStream()}>
        {/* <video ref={videoElement} muted={true}/> */}
        <MainVideoStyled>
          <VideoWrapperStyled
            isMain={role === 'main'}
            onClick={() => setRole('main')}
          >
            <VideoStyled controls={false} muted={!isAudio} />
            {!isVideo && <WrapperLabelStyled>
              <LabelStyled>111</LabelStyled>
            </WrapperLabelStyled>}
          </VideoWrapperStyled>
          <VideoWrapperStyled
            isMain={role === 'second'}
            onClick={() => setRole('second')}
          >
            <VideoStyled controls={false} muted={!isAudio} />
            {!isVideo && <WrapperLabelStyled>
              <LabelStyled>222</LabelStyled>
            </WrapperLabelStyled>}
          </VideoWrapperStyled>
        </MainVideoStyled>
        <ControllerStyled>
          <GreyButtonStyled onClick={() => changeIsVideo(!isVideo)}>
            <Icon type={isVideo ? 'video' : 'no-video'} color="#fff" size="18px" />
          </GreyButtonStyled>
          <GreyButtonStyled onClick={() => changeIsAudio(!isAudio)}>
            <Icon type={isAudio ? 'microphone' : 'no-microphone'} color="#fff" size="18px" />
          </GreyButtonStyled>
          <RedButtonStyled onClick={() => closeStream()}>
            <Icon type="phone-2" color="#fff" size="18px" />
          </RedButtonStyled>
        </ControllerStyled>
      </ModalBox>
    </ModalReStyled>
  )
}

export default CallModal
