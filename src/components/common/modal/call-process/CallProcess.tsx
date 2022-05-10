import React, { useState, useRef, useEffect } from 'react'
import { useStore } from 'effector-react'
import styled from 'styled-components'
import ModalBox, { ModalBoxStyled } from '@/components/common/modal/ModalBox'
import Icon from '@/components/ui/Icon'
import {
  $isVideo,
  changeIsVideo,
  $isAudio,
  changeIsAudio,
  $isVideoRecipient,
  $isAudioRecipient,
} from '@/components/common/modal/call-process/CallProcess.model'
import {
  $userStream,
  $userSignal,
} from '@/components/common/modal/common-call-modal/CommonCallModal.model'
import { User } from '@/api/types'

const WrapperCallProcess = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
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
`

const ControllerStyled = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`
const ControllerStyledRecipient = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) =>
    props.theme.rgba(props.theme.colors.black, 0.4)};
  z-index: 11;
`
const LayerVideoHide = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: ${(props) => props.theme.rgb(props.theme.colors.grey9)};
  z-index: 10;
`
const RecipientButtonStyled = styled.div`
  padding: 5px;
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
  right: ${(props) => (props.isMain ? '0' : '20px')};
  bottom: ${(props) => (props.isMain ? '0' : '20px')};
  width: ${(props) => (props.isMain ? '100%' : '200px')};
  height: ${(props) => (props.isMain ? '100%' : '130px')};
  border: ${(props) =>
    props.isMain
      ? 'none'
      : `1px solid ${props.theme.rgb(props.theme.colors.white)}`};
  background-color: ${(props) =>
    props.theme.rgba(props.theme.colors.grey9, props.isMain ? 0 : 1)};
  cursor: ${(props) => (props.isMain ? 'default' : 'pointer')};
  z-index: ${(props) => (props.isMain ? '1' : '2')};
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
  z-index: 11;
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
interface ICallProcessModal {
  isInitiator: boolean
  myInfo: User
  userInfo: User
  leaveFromCall(): void
  callUser(stream: MediaStream): void
  answerCall(stream: MediaStream): void
  initiatorSignal(): void
  toggleStateAudio(val: boolean): void
  toggleStateVideo(val: boolean): void
}

const CallProcessModal: React.FC<ICallProcessModal> = ({
  isInitiator,
  myInfo,
  userInfo,
  leaveFromCall,
  callUser,
  answerCall,
  initiatorSignal,
  toggleStateAudio,
  toggleStateVideo,
}) => {
  const isVideo = useStore($isVideo)
  const isAudio = useStore($isAudio)
  const isVideoRecipient = useStore($isVideoRecipient)
  const isAudioRecipient = useStore($isAudioRecipient)
  //
  const [role, setRole] = useState(myInfo.user_id)
  const [stream, setStream] = useState<MediaStream>()
  //
  const myVideo = useRef<HTMLVideoElement>(null)
  const userVideo = useRef<HTMLVideoElement>(null)
  //
  const userSignal = useStore($userSignal)
  const userStream = useStore($userStream)

  useEffect(() => {
    setTimeout(() => {
      // Старые браузеры могут не реализовывать свойство mediaDevices,
      // поэтому сначала присваиваем свойству ссылку на пустой объект
      if (navigator.mediaDevices === undefined) {
        // @ts-ignore
        navigator.mediaDevices = {}
      }
      // Некоторые браузеры частично реализуют свойство mediaDevices, поэтому
      // мы не можем присвоить ссылку на объект свойству getUserMedia, поскольку
      // это переопределит существующие свойства. Здесь, просто добавим свойство
      // getUserMedia, если оно отсутствует.
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // Сначала, если доступно, получим устаревшее getUserMedia
          // @ts-ignore
          const getUserMedia =
            // @ts-ignore
            navigator.webkitGetUserMedia || navigator.mozGetUserMedia
          // Некоторые браузеры не реализуют его, тогда вернём отменённый промис
          // с ошибкой для поддержания последовательности интерфейса
          if (!getUserMedia) {
            return Promise.reject(
              new Error('getUserMedia is not implemented in this browser'),
            )
          }
          // Иначе, обернём промисом устаревший navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            facingMode: 'user',
            width: { min: 640, ideal: 640, max: 640 },
            height: { min: 480, ideal: 480, max: 480 },
            frameRate: { ideal: 30, max: 30 },
          },
        })
        .then((streamm) => {
          setStream(streamm)
          if (myVideo && myVideo.current) myVideo.current.srcObject = streamm
          if (isInitiator) callUser(streamm)
        })
    }, 2000)
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop()
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (isInitiator) initiatorSignal()
    if (!isInitiator && stream) answerCall(stream)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userSignal])
  useEffect(() => {
    if (userVideo && userVideo.current) userVideo.current.srcObject = userStream
  }, [userStream])
  //
  useEffect(() => {
    toggleStateAudio(isAudio)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAudio])
  useEffect(() => {
    toggleStateVideo(isVideo)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideo])
  return (
    <WrapperCallProcess>
      <ModalBox showClose={false} closeModal={() => leaveFromCall()}>
        <MainVideoStyled>
          <VideoWrapperStyled
            isMain={role === myInfo.user_id}
            onClick={() => setRole(myInfo.user_id)}
          >
            {!isVideo && <LayerVideoHide />}
            <VideoStyled
              ref={myVideo}
              autoPlay
              playsInline
              controls={false}
              muted
            />
            {!isVideo && (
              <WrapperLabelStyled>
                <LabelStyled>
                  {myInfo.first_name} {myInfo.last_name}
                </LabelStyled>
              </WrapperLabelStyled>
            )}
          </VideoWrapperStyled>
          <VideoWrapperStyled
            isMain={role === userInfo.user_id}
            onClick={() => setRole(userInfo.user_id)}
          >
            <VideoStyled
              ref={userVideo}
              autoPlay
              playsInline
              controls={false}
              muted={!isAudioRecipient}
            />
            {!isVideoRecipient && <LayerVideoHide />}
            {!isVideoRecipient && (
              <WrapperLabelStyled>
                <LabelStyled>
                  {userInfo.first_name} {userInfo.last_name}
                </LabelStyled>
              </WrapperLabelStyled>
            )}
            <ControllerStyledRecipient>
              <RecipientButtonStyled>
                <Icon
                  type={isVideoRecipient ? 'video' : 'no-video'}
                  color="#fff"
                  size="18px"
                />
              </RecipientButtonStyled>
              <RecipientButtonStyled>
                <Icon
                  type={isAudioRecipient ? 'microphone' : 'no-microphone'}
                  color="#fff"
                  size="18px"
                />
              </RecipientButtonStyled>
            </ControllerStyledRecipient>
          </VideoWrapperStyled>
        </MainVideoStyled>
        <ControllerStyled>
          <GreyButtonStyled onClick={() => changeIsVideo(!isVideo)}>
            <Icon
              type={isVideo ? 'video' : 'no-video'}
              color="#fff"
              size="18px"
            />
          </GreyButtonStyled>
          <GreyButtonStyled onClick={() => changeIsAudio(!isAudio)}>
            <Icon
              type={isAudio ? 'microphone' : 'no-microphone'}
              color="#fff"
              size="18px"
            />
          </GreyButtonStyled>
          <RedButtonStyled onClick={() => leaveFromCall()}>
            <Icon type="phone-2" color="#fff" size="18px" />
          </RedButtonStyled>
        </ControllerStyled>
      </ModalBox>
    </WrapperCallProcess>
  )
}

export default CallProcessModal
