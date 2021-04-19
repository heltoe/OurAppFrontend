import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Modal from '@/components/common/modal/Modal'
import ModalBox, { ModalBoxStyled } from '@/components/common/modal/ModalBox'
import { changeIsShowModal } from '@/components/common/modal/CallModal.model'

const VideoStreamStyled = styled.video`

`
const CallModal: React.FC = () => {
  const videoElement = useRef(null)
  const [test, setTest] = useState(null)
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
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    }).then(stream => {
      addStream(stream)
    })
    return () => {
      const video = videoElement?.current as HTMLVideoElement | null
      if (video) video.srcObject = null
    }
  }, [])
  return (
    <Modal>
      <ModalBox closeModal={() => closeStream()}>
        <video ref={videoElement} muted={true}/>
      </ModalBox>
    </Modal>
  )
}

export default CallModal
