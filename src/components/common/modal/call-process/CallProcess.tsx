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
} from '@/components/common/modal/call-process/CallProcess.model'
import { User } from '@/api/types'
import { changeStream } from '@/components/common/modal/common-call-modal/CommonCallModal.model'

const WrapperCallProcess = styled.div`
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
  background-color: ${(props) => props.theme.rgba(props.theme.colors.grey9, props.isMain ? 0 : 1)};
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
  myInfo: User
  userInfo: User
  leaveFromCall(): void
}

const CallProcessModal: React.FC<ICallProcessModal> = ({
  myInfo,
  userInfo,
  leaveFromCall,
}) => {
  const isVideo = useStore($isVideo)
  const isAudio = useStore($isAudio)
  const [role, setRole] = useState(myInfo.user_id)
  //
  const myVideo = useRef<HTMLVideoElement>(null)
  const userVideo = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
        // video: {
        //   mandatory: {
        //     minWidth: 640,
        //     maxWidth: 640,
        //     minHeight: 480,
        //     maxHeight: 480,
        //     minFrameRate: 30,
        //   },
        // },
      })
      .then((stream) => {
        changeStream(stream)
        if (myVideo && myVideo.current) myVideo.current.srcObject = stream
      })
  })
  return (
    <WrapperCallProcess>
      <ModalBox showClose={false} closeModal={() => leaveFromCall()}>
        <MainVideoStyled>
          <VideoWrapperStyled
            isMain={role === myInfo.user_id}
            onClick={() => setRole(myInfo.user_id)}
          >
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
              muted={false}
            />
            {!isVideo && (
              <WrapperLabelStyled>
                <LabelStyled>
                  {userInfo.first_name} {userInfo.last_name}
                </LabelStyled>
              </WrapperLabelStyled>
            )}
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
