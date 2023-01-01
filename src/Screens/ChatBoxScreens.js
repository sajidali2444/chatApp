import React from 'react'
import styled from 'styled-components';
import './style.css'
import {Switch, Input} from "antd";
import {ClipLoader} from "react-spinners";
import {CgClose} from 'react-icons/cg';
import {BsFillMicFill, BsFillMicMuteFill} from 'react-icons/bs';
import {RiSendPlaneFill} from 'react-icons/ri';
import {GiSpeaker} from 'react-icons/gi';
import logoImage from '../Assets/logoo.png'
import footerLogoImage from '../Assets/footerLogo.png';
import messageIconSvg from '../Assets/messageSvg.svg';
import profileImage from '../Assets/profilelogo.png';


const BodyChatMainWrapper = styled.div`
      position: absolute;
      bottom: 5%;
      right: 3%;
      z-index: 99;

  @media screen and (max-width: 450px) {
   position:absolute;
    bottom: 4%;
    right: 0%;
  }
 
    `;
const MainChatBoxWrapperOuter = styled.div`
      width: 300px;
      height:  550px;
  
      // background-color:${props => props.theme.colors.blueDefaultColour};
      border-radius: 20px;
      padding: 0px;
  position: relative;

  @media screen and (max-width: 450px) {
    width: 100%;
    height:95vh;
    border-radius: 20px;
  }
      
    `;
const BlackWrapperTopSection = styled.section`
      width: 100%;
      height: 35%;
      border-radius: 20px 20px 0px 0px;
      background-color:${props => props.theme.colors.darkGrayColour};
  position: relative;

  @media screen and (max-width: 450px) {
    width: 100%;
    height: 35%;
  }
  
    `;

const BlueImageWavesSection = styled.section`
  position: relative;
    `;

const CurveBack = styled.div`
      height: 50px;
      border-radius: 20px 20px 0px 0px;
      background-color: ${props => props.theme.colors.blueDefaultColour};
    `;

const ChatBoxWrapperCircleOuter = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      cursor: pointer;
      

    `;


const BoxWelcomeWrapper = styled.div`
      position: relative;
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


const WhiteSectionMainWrapper = styled.div`
      width: 100%;
      height: 60%;
      background-color: ${props => props.theme.colors.whiteColour};
    `;


const CloseIconWrapper = styled.div`
  position: absolute;
  background-color: ${props => props.theme.colors.blackColour};
  width: 30px;
  height: 30px;
  border-radius: 50px;
  top:10%;
  right: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
    `;

const TopLogoImageStyle = styled.img`
  width: 45%;
  position: absolute;
  left:26%;
  top:9%;
  z-index: 99;
  overflow: hidden;
  
  
  @media screen and (max-width: 450px){
    width: 35%;
    left:32%;
  }
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



const ChatMessagesMainWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  // background-color:${props => props.theme.colors.whiteColour};
  background-color: red;
  
  
    `;


const TextChatWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;  
  flex-direction: row;
  //height: 15%;
  //border-top: 0.5px solid ${props => props.theme.colors.blackColour};

  padding-top:10px;
  padding-bottom: 10px;
  background-color:white;
  //
  position: absolute;

  bottom: 0%;
  right:0%;
  left:0%;
  width: 100%;

  
  //overflow-x: hidden;
    `;


const TextChatStyle = styled.div`
    width: 100%;
  padding-left: 10px; 
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //vertical-align: middle;
  //height: 100%;
    & textarea{
      height: 4px;
      max-height: 70px!important;
   
    }
  //   & textarea{
  //     border:none;
  //     background:none;
  //     resize: none;
  //     width: 100%;
  //     font-size: 16px;
  //     display: flex;
  //     font-family:${props => props.theme.colors.sansSerifFont};
  //     justify-content: center;
  //     align-items: center; 
  //     text-align: left; 
  //     vertical-align: middle;
  //    
  //   }
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



//Chat Header Style

const ChatHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: -13%;
  padding-left: 10px;
  
  @media screen and (max-width: 450px){
    margin-top: 0%;
  }
`;


const ChatHeaderProfileWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
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
    top: -2px;
    left: -1px;
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
    top: -2px;
    left: -1px;
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
                        }) => {

    const { TextArea } = Input;

    return(
        <BodyChatMainWrapper>

            {silviaOpen ?
              <MainChatBoxWrapperOuter>
                  {loading &&
                      <div className='LoadingWrapperChat'>
                          <div className='loaderCenterStyle'>
                              <ClipLoader color='#086DB6' />

                          </div>


                      </div>
                  }

                  <BlackWrapperTopSection>

                       <BlueImageWavesSection>
                           <CloseIconWrapper onClick={handleSilviaChat}>
                               <CgClose size={23} color={'white'} />
                           </CloseIconWrapper>

                           <TopLogoImageStyle src={logoImage}   />

                           <CurveBack >
                           </CurveBack>
                           <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 500"
                                className="transition duration-300 ease-in-out delay-150">
                               <path
                                   d="M 0,500 C 0,500 0,250 0,250 C 96.5,281.25 193,312.5 328,288 C 463,263.5 636.4999999999999,183.25 765,174 C 893.5000000000001,164.75 977,226.5 1082,251 C 1187,275.5 1313.5,262.75 1440,250 C 1440,250 1440,500 1440,500 Z"
                                   stroke="none"  fill="#086DB6"
                                   className="transition-all duration-300 ease-in-out delay-150 path-0"
                                   transform="rotate(-180 720 250)"></path>
                           </svg>
                       </BlueImageWavesSection>

                        <ChatHeaderWrapper>
                            <ChatHeaderProfileWrapper>
                                <ChatProfileImageWrapper>
                                    <img src={profileImage} alt=""/>
                                </ChatProfileImageWrapper>
                                <ChatProfileImageContent>
                                    <h4>
                                        Chat With
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

                        </ChatHeaderWrapper>
                    </BlackWrapperTopSection>


                    <WhiteSectionMainWrapper>

                       <ChatMessagesMainWrapper>
                           {/*{userNameToken}*/}
                           <div className='chatMessagesWrapper'>
                               <p>
                                   asf
                               </p>
                               <p>
                                   asf
                               </p>
                               <p>
                                   asf
                               </p>
                               <p>
                                   asf
                               </p>
                               <p>
                                   asf
                               </p>    <p>
                               asf
                           </p>    <p>
                               asf
                           </p>
                               <p>
                                   asf
                               </p>
                               <p>
                                   asf
                               </p>    <p>
                               asf
                           </p>




                           </div>


<div>


                       <TextChatWrapper>
                            <TextChatStyle >
                                <TextArea
                                    style={{

                                        border: '1px solid black',
                                        marginBottom: 0,
                                        resize: 'none',
                                    }}
                                    autoSize={true}
                                    onChange={handleChatText}
                                    placeholder="Type or Say Your Message"
                                />
                                {/*<textarea onChange={handleChatText} placeholder={"Type or Say Your Message ..."} />*/}
                            </TextChatStyle>

                           <TextChatIconsWrapper>

                               {chatText ?
                                   <MicBackgroundStyle bg='black'>
                                       <RiSendPlaneFill size={18} color={'white'} />
                                   </MicBackgroundStyle>
                                   :
                                micEnabled ?
                                   <MicBackgroundStyle bg='green' onClick={handleMicPermissions}>
                                    <BsFillMicFill size={18}/>
                                   </MicBackgroundStyle>
                                    :
                                    <MicBackgroundStyle bg='#8B0000' onClick={handleMicPermissions}>
                                    <BsFillMicMuteFill size={18} />
                                    </MicBackgroundStyle>



                               }

                           </TextChatIconsWrapper>

                       </TextChatWrapper>
</div>
                       </ChatMessagesMainWrapper>
                    </WhiteSectionMainWrapper>

                  <FooterSectionWrapper>
                      <FooterListenWrapper>

                      <FooterCrossIconWrapper>
                          <GiSpeaker size={30} color={'white'} />
                          <ToggleListenSwitchWrapper>
                              <Switch  onChange={handleSwitchChange} />
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
