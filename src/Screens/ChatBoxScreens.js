import React from 'react'
import styled from 'styled-components';
import './style.css'
import {Switch, Input, Modal} from "antd";
import {ClipLoader} from "react-spinners";
import {CgClose} from 'react-icons/cg';
import {BsFillMicFill, BsFillMicMuteFill, BsFillPersonFill} from 'react-icons/bs';
import {RiSendPlaneFill} from 'react-icons/ri';
import {GiSpeaker, GiSpeakerOff} from 'react-icons/gi';
import logoImage from '../Assets/logoo.png'
import footerLogoImage from '../Assets/footerLogo.png';
import messageIconSvg from '../Assets/messageSvg.svg';
import profileImage from '../Assets/profilelogo.png';
import chatProfileImage from '../Assets/chatSilvia.png';
import waveBackground from '../Assets/farm.png';

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';




//Box Circle Outer Style


const ChatBoxWrapperCircleOuter = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      cursor: pointer;
    `;


const BoxWelcomeWrapper = styled.div`
      position: relative;
  
  @media screen and (max-width: 450px){
    & {
      display: none;
    }
  }
    `;


const BoxWelcome = styled.p`
      background:${props => props.theme.colors.whiteColour};
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 4px;
      height:40px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      padding: 0px 20px;
      margin-right: 20px;
    `;


const Pointer = styled.section`
      border:solid 10px transparent;
      border-left-color:${props => props.theme.colors.whiteColour};
      position:absolute;
      right: 0%;
      top:36%;
    `;


const ChatBoxCircleWrapperInner = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50px;
  background-color: ${props => props.theme.colors.blackColour};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 1px 0px 40px ${props => props.theme.colors.blueDefaultColour};
  animation: mymove 1s infinite;

  @keyframes mymove {
    from {
      box-shadow: 1px 0px 40px #106eb2;
    }
    to {
      box-shadow: 1px 0px 40px #1778be;
    }
  }
`;


const ChatBoxWrapperCircle = styled.div`
      width: 70px;
      height: 70px;
      border-radius: 50px;
      border: 2px solid ${props => props.theme.colors.whiteColour};
      background-color: ${props => props.theme.colors.blueDefaultColour};
      display: flex;
      justify-content: center;
      align-items: center;
  
  & img{
    width: 70%;
  }
    `;

//BodyChat Start

const BodyChatMainWrapper = styled.div`
      position: absolute;
      bottom: 5%;
      right: 3%;
      z-index: 99;
  

  @media screen and (max-width: 450px) {
   position:absolute;
    bottom: 0%;
    right: 0%;
  }
 
    `;
const MainChatBoxWrapperOuter = styled.div`
      width: 300px;
      height:  550px;
      //background-color: green;
       background-color:${props => props.theme.colors.blueDefaultColour};
      border-radius: 20px;
      padding: 0px;

  @media screen and (max-width: 450px) {
    width: 100%;
    height:90vh;
    border-radius: 20px;
  }
    `;


//Chat Header Style


//Top Blue section styling

const BlueMainSectionImage = styled.div`
  background-image:url(${waveBackground});
  background-size: cover;
  background-repeat: no-repeat;
  background-position:center;
  width: 100%;
  height: 33%;
  border-radius: 20px 20px 0px 0px;
  position: relative;
    `;

const BlueLogoSectionWrapper = styled.div`
  height: 50%;
  position: relative;
    `;

const CrossIconWrapper = styled.div`
  position: absolute;
  top:25%;
  right: 10%;
  cursor: pointer;
  background-color:black;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
    `;

const BlackSectionContentWrapper = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0%;
    `;

const FlexWrapperBlack = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
    `;


const TopLogoImageStyle = styled.img`
  width: 45%;
  position: absolute;
  left:26%;
  top:14%;
  z-index: 99;
  overflow: hidden;
  
  
  @media screen and (max-width: 450px){
    width: 40%;
    left:30%;
  }
  @media screen and (max-width: 360px){
    width: 38%;
    left:30%;
    top:30%;
  }
    `;

const ChatHeaderProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
    `;


const ChatProfileImageWrapper = styled.div`
  
  & img{
    width:50px;
  }


    `;



const ChatProfileImageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 5px;
  
  & h4{
    font-size: 16px;
    color: ${props => props.theme.colors.whiteColour};
    font-family:${props => props.theme.colors.sansSerifFont};
    text-align: left;
    font-weight: 520;
  }
  
  & h2{
    font-size: 18px;
    text-align: left;
    margin-top: -20px;
    color: ${props => props.theme.colors.whiteColour};
    font-family: ${props => props.theme.colors.sansSerifFont};
    font-weight: 520;
  }
    `;



const ChatOnlineStatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  margin-top: 10px;
  
  & .inputOnlineStyle[type='radio']:checked:after{
    width: 10px;
    height: 10px;
    border-radius: 15px;
    top: 2px;
    left: 1px;
    position: relative;
    background-color: #0ce150;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid #dcd6d6;
  }
  & .inputOfflineStyle[type='radio']:checked:after{
    width: 10px;
    height: 10px;
    border-radius: 15px;
    top: 0px;
    left: 1px;
    position: relative;
    background-color: #5e5c5c;
    content: '';
    display: inline-block;
    visibility: visible;
    border: 2px solid #dcd6d6;
  }

& p{
  font-size: 14px;
  font-family: sans-serif;
  font-weight: 400;
  color: #fff;
  padding-left: 5px;
}
`;




const WhiteSectionMainWrapper = styled.div`
      width: 100%;
      height: 60%;
  max-height: 60%;
      background-color: ${props => props.theme.colors.whiteColour};
    `;





const ChatMessagesMainWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  height: 82%;
  position: relative;
  background-color:${props => props.theme.colors.whiteColour};

    `;


const TextChatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  
  flex-direction: row;
  //height: 25%;
  border-top: 0.5px solid ${props => props.theme.colors.blackColour};
  //background-color: red;
  padding-top:10px;
  padding-bottom: 10px;
  background-color:white;
  //position: absolute;
  //
  //bottom: 0%;
  //right:0%;
  //left:0%;
  width: 100%;
    `;


const TextChatStyle = styled.div`
    width: 100%;
  padding-left: 10px; 
    & textarea{
      //height: 1%;
      max-height: 40px!important;
      border: none;
   
    }
  
  
  @media screen and (max-width: 450px){
    & textarea{
      //height: 1%;
      max-height: 50px!important;
      border: none;

    }
  }
 
   & textarea::placeholder {
     font-size: 12px;
    
   }
   & textarea:hover,
   input:hover,
   textarea:active,
   input:active,
   textarea:focus,
   input:focus,
   button:focus,
   button:active,
   button:hover,
   label:focus,
   .btn:active,
   .btn.active
   {
     outline:0px !important;
     border: none;
     -webkit-appearance:none;
     box-shadow: none !important;
    
   }
  
    `;


const TextChatIconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
 
    `;


const MicBackgroundStyle = styled.div`
  background-color: ${props => props.bg && props.bg};
  width: 37px;
  height: 37px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-left: 10px;
  cursor: pointer;
  margin-right: 10px;
 
    `;





//FooterSectionStyle

const FooterSectionWrapper = styled.section`
  height: 7%;
  border-radius: 0px 0px 20px 20px;
  background-color: ${props => props.theme.colors.blueDefaultColour};
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
 
    `;

const FooterListenWrapper = styled.div`
  width: 70%;
 
    `;

const FooterCrossIconWrapper = styled.div`
  margin-left: 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  width: 100%;
    `;



const ToggleListenSwitchWrapper = styled.div`
  margin-left: 10px;
  margin-right: 10px;

  & .ant-switch.ant-switch-checked {
    background-color: ${props => props.theme.colors.greenColour};

  }

  & .ant-switch.ant-switch-checked:hover:not(.ant-switch-disabled) {
    background-color: ${props => props.theme.colors.greenColour};
  }

  & .ant-switch .ant-switch-checked:not(.ant-switch-disabled) {
    background-color: ${props => props.theme.colors.whiteGrayColour};
  }

  & .ant-switch:hover:not(.ant-switch-disabled) {
    background-color: ${props => props.theme.colors.whiteGrayColour};
  }

  & .ant-switch {
    background-color: ${props => props.theme.colors.whiteGrayColour};
  }

`;


const FooterLogoImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
  
  & p{
    padding-right: 5px;
    color: ${props => props.theme.colors.whiteColour};
    font-size: 12px;
    font-family: ${props => props.theme.colors.sansSerifFont};
  }
  
  & img{
    width: 54%;
  }
    `;








const ChatBoxScreens = ({
                            silviaOpen,
                            loading,
                            handleSilviaChat,
                            isOnline,
                            handleChatText,
                            chatText,
                            micEnabled,
                            handleMicPermissions,
                            handleSwitchChange,
                            handleGreetingMessages,
                            userGreetMessages,
                            handleMessages,
                            toggleEnabled,
                            handleCloseChat,
                            handleShowModal,
                            handleModalCancel,
                            deleteModalOpen,
                            handlePlayCheck,
                            playedAudio,
                            deviceName
                        }) => {


    const { TextArea } = Input;

    return(
        <BodyChatMainWrapper deviceView={deviceName}>

            {silviaOpen ?
              <MainChatBoxWrapperOuter>
                  {deleteModalOpen ?
                  <div className='deleteModalMainWrapper'>
                      <div className='deleteModalBgWrapper'>
                          <p>
                              Do you want to close the chat?
                          </p>

                          <div className='deleteChatBtnWrapper'>
                              <div className='noBtnStyle' onClick={handleModalCancel}>
                                  Cancel
                              </div>
                              <div className='yesBtnStyle' onClick={loading ? null : handleCloseChat}>
                                 Okay
                              </div>

                          </div>

                      </div>


                  </div>
                      :
                      null }

                  {loading &&
                      <div className='LoadingWrapperChat'>
                          <div className='loaderCenterStyle'>
                              <ClipLoader color='#086DB6' />
                          </div>


                      </div>
                  }

                <BlueMainSectionImage>
                      <BlueLogoSectionWrapper>
                         <CrossIconWrapper onClick={handleShowModal}>
                              <CgClose size={23} color={'white'} />
                         </CrossIconWrapper>
                          <TopLogoImageStyle src={logoImage}   />

                      </BlueLogoSectionWrapper>

                      <BlackSectionContentWrapper>
                          <FlexWrapperBlack>
                                    <ChatHeaderProfileWrapper>
                                        <ChatProfileImageWrapper>
                                            <img src={profileImage} alt=""/>
                                        </ChatProfileImageWrapper>
                                        <ChatProfileImageContent>
                                            <h4>
                                                Speak With
                                            </h4>
                                            <h2>
                                                SILVIA
                                            </h2>

                                        </ChatProfileImageContent>
                                    </ChatHeaderProfileWrapper>


                                        <div className=''>
                                            {
                                                isOnline ?
                                               <ChatOnlineStatusWrapper>
                                                   <input type='radio' className='inputOnlineStyle' defaultChecked />
                                                    <p>
                                                        Online
                                                    </p>
                                               </ChatOnlineStatusWrapper>


                                                    :
                                                <ChatOnlineStatusWrapper>
                                                <input type='radio' class='inputOfflineStyle' defaultChecked />

                                                <p>
                                                Offline
                                                </p>
                                                </ChatOnlineStatusWrapper>



                                            }


                                        </div>




                          </FlexWrapperBlack>

                      </BlackSectionContentWrapper>

                </BlueMainSectionImage>



                    <WhiteSectionMainWrapper>

                        <ChatMessagesMainWrapper>
                           <div className='chatMessagesWrapper'>
                               {userGreetMessages?.map((data) =>
                                   data?.from === 'robot'?
                           <div className='robotProfileWrapper'>
                               {data?.message ?
                                   <div className='silviaProfileImageWrapper'>
                                       <img src={chatProfileImage} alt=""/>
                                   </div>
                                   :
                                   null

                               }
                             <div style={{position: 'relative'}}>
                                 <div className='chatBoxMessageWrapper'>
                                     {data?.message ?
                                         <div className='messageWrapper'>
                                             { data?.message }
                                         </div>
                                      :
                                         toggleEnabled ?

                                             <div className='audioWrapper'>
                                                 ok
                                                 {/*<audio  autoPlay ref={audioRef} onPlay={handlePlayCheck}>*/}
                                                 {/*    <source type='audio/wav' src={`http://208.109.188.242:5003/api/tts?voice=en-us/southern_english_female-glow_tts&text=${data?.url}&vocoder=hifi_gan%2Funiversal_large&denoiserStrength=0.002&noiseScale=0.667&lengthScale=0.85&ssml=false`} />*/}
                                                 {/*</audio>*/}

                                             </div>
                                             : null

                                     }
                                 </div>



                             </div>
                           </div>
                                       :
                                       <div className='userProfileWrapper'>

                                           <div style={{position: 'relative'}}>
                                               <div className='chatBoxMessageWrapper'>

                                                   {data?.message ?
                                                       <div className='userMessageWrapper'>
                                                           { data?.message }
                                                       </div>
                                                       :
                                                       toggleEnabled ?
                                                       <div className='audioWrapper'>
                                                           <audio autoPlay>
                                                               <source type='audio/wav' src={`http://208.109.188.242:5003/api/tts?voice=en-us/southern_english_female-glow_tts&text=${data?.url}&vocoder=hifi_gan%2Funiversal_large&denoiserStrength=0.002&noiseScale=0.667&lengthScale=0.85&ssml=false`} />
                                                           </audio>
                                                       </div>
                                                           : null

                                                   }
                                               </div>
                                              {/*<div className='pointerMessages'>*/}

                                              {/*</div>*/}
                                           </div>
                                           <div className='userProfileImageWrapper'>
                                               <BsFillPersonFill size={22} color={'white'} />
                                           </div>
                                       </div>

                               )}




                               {playedAudio?.map((data) =>
                                   data?.from === 'robot'?
                                       <div className='robotProfileWrapper'>
                                           {data?.message ?
                                               <div className='silviaProfileImageWrapper'>
                                                   <img src={chatProfileImage} alt=""/>
                                               </div>
                                               :
                                               null

                                           }
                                           <div style={{position: 'relative'}}>
                                               <div className='chatBoxMessageWrapper'>
                                                   {data?.message ?
                                                       <div className='messageWrapper'>
                                                           { data?.message }
                                                       </div>
                                                       :
                                                       toggleEnabled ?

                                                           <div className='audioWrapper'>

                                                               <audio  autoPlay >
                                                                   <source type='audio/wav' src={`http://208.109.188.242:5003/api/tts?voice=en-us/southern_english_female-glow_tts&text=${data?.url}&vocoder=hifi_gan%2Funiversal_large&denoiserStrength=0.002&noiseScale=0.667&lengthScale=0.85&ssml=false`} />
                                                               </audio>
                                                           </div>
                                                           : null

                                                   }
                                               </div>


                                               {/*<Pointer/>*/}
                                           </div>
                                       </div>
                                       :
                                       <div className='userProfileWrapper'>

                                           <div style={{position: 'relative'}}>
                                               <div className='chatBoxMessageWrapper'>

                                                   {data?.message ?
                                                       <div className='userMessageWrapper'>
                                                           { data?.message }
                                                       </div>
                                                       :
                                                       toggleEnabled ?
                                                           <div className='audioWrapper'>
                                                               <audio autoPlay>
                                                                   <source type='audio/wav' src={`http://208.109.188.242:5003/api/tts?voice=en-us/southern_english_female-glow_tts&text=${data?.url}&vocoder=hifi_gan%2Funiversal_large&denoiserStrength=0.002&noiseScale=0.667&lengthScale=0.85&ssml=false`} />
                                                               </audio>
                                                           </div>
                                                           : null

                                                   }
                                               </div>
                                               {/*<div className='pointerMessages'>*/}

                                               {/*</div>*/}
                                           </div>
                                           <div className='userProfileImageWrapper'>
                                               <BsFillPersonFill size={22} color={'white'} />
                                           </div>
                                       </div>

                               )}

                           </div>

                           <div></div>
                       </ChatMessagesMainWrapper>
                        <TextChatWrapper>
                            <TextChatStyle >
                                <TextArea
                                    style={{
                                        // border: '1px solid black',
                                        marginBottom: 0,
                                        resize: 'none',
                                    }}
                                    disabled={loading ? loading : false}
                                    autoSize={false}
                                    value={chatText}
                                    onChange={handleChatText}
                                    placeholder="Type or Say Your Message"
                                />
                                {/*<textarea onChange={handleChatText} placeholder={"Type or Say Your Message ..."} />*/}
                            </TextChatStyle>

                            <TextChatIconsWrapper>

                                {chatText ?
                                    <MicBackgroundStyle bg='black'>
                                        <RiSendPlaneFill size={18} color={'white'} onClick={ loading ? null : handleMessages} />
                                    </MicBackgroundStyle>
                                    :
                                    micEnabled ?
                                        <MicBackgroundStyle bg='green' onClick={loading ? null : handleMicPermissions}>
                                            <BsFillMicFill size={18}/>
                                        </MicBackgroundStyle>
                                        :
                                        <MicBackgroundStyle bg='#8B0000' onClick={loading ? null : handleMicPermissions}>
                                            <BsFillMicMuteFill size={18} />
                                        </MicBackgroundStyle>



                                }

                            </TextChatIconsWrapper>

                        </TextChatWrapper>
                    </WhiteSectionMainWrapper>

                  <FooterSectionWrapper>
                      <FooterListenWrapper>

                      <FooterCrossIconWrapper>
                          {
                              toggleEnabled ?
                                  <GiSpeaker size={30} color={'white'} />
                                  :
                                  <GiSpeakerOff size={30} color={'white'} />

                          }

                          <ToggleListenSwitchWrapper>
                              <Switch  defaultChecked onChange={handleSwitchChange} />
                          </ToggleListenSwitchWrapper>
                      </FooterCrossIconWrapper>


                      </FooterListenWrapper>

                      <FooterLogoImageWrapper>
                          <p>
                              Powered By
                          </p>
                          <img src={footerLogoImage} alt=""/>

                      </FooterLogoImageWrapper>

                  </FooterSectionWrapper>

              </MainChatBoxWrapperOuter>

                :
                <ChatBoxWrapperCircleOuter onClick={handleSilviaChat}>
                   <BoxWelcomeWrapper>
                       <BoxWelcome>
                           Speak With SILVIA Now ...
                       </BoxWelcome>
                       <Pointer/>
                   </BoxWelcomeWrapper>
                  <ChatBoxCircleWrapperInner>
                       <ChatBoxWrapperCircle>
                           <img src={messageIconSvg} alt=""/>
                       </ChatBoxWrapperCircle>

                  </ChatBoxCircleWrapperInner>

                </ChatBoxWrapperCircleOuter>

            }


        </BodyChatMainWrapper>


    )
}

export default ChatBoxScreens
