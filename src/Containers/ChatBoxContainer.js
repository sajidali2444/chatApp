import axios from 'axios';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import ChatBoxScreens from '../Screens/ChatBoxScreens';

const ChatBoxContainer = () => {
  const { addToast } = useToasts();
  const [silviaOpen, setSilviaOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chatText, setChatText] = useState('');
  const [micEnabled, setMicEnabled] = useState(false);
  const [isOnline, set_isOnline] = useState(true);
  const [toggleEnabled, setToggleEnabled] = useState(true);
  const [userNameToken, setUserNameToken] = useState('');
  const [userGreetMessages, setUserGreetMessages] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [playedAudio, setPlayedAudio] = useState([]);
  const [deviceName, setDeviceName] = useState('');

  useEffect(() => {
    console.log(navigator?.userAgent);
    let userAgentDevice = navigator?.userAgent;

    if (userAgentDevice?.includes('Android')) {
      setDeviceName('android');
      // addToast('android' , { appearance: 'warning' });
      // "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Mobile Safari/537.36"
    } else if (userAgentDevice?.includes('iPhone')) {
      // addToast('ios' , { appearance: 'warning' });
      setDeviceName('ios');
    }
  }, []);

  const handleShowModal = () => {
    setDeleteModalOpen(true);
  };
  const handleModalCancel = () => {
    console.log('Clicked cancel button');
    setDeleteModalOpen(false);
  };

  let interval = null;

  const handleGreetingMessages = async (guestUser, setLoading) => {
    setChatText('');

    await axios
      .get(`https://silviaserver.com/SilviaServer/Core/GetAll?user=${guestUser}`)
      .then((resp) => {
        if (resp?.data?.success === true) {
          const { response } = resp?.data;
          if (response.length > 0) {
            setLoading(false);

            const messages = response[0]?.results;

            const audioUrl = `http://208.109.188.242:5003/api/tts?voice=en-us/southern_english_female-glow_tts&text=${messages[1]}&vocoder=hifi_gan%2Funiversal_large&denoiserStrength=0.002&noiseScale=0.667&lengthScale=0.85&ssml=false`;
            debugger;
            // var audio = new Audio(playedAudio);
            let audio = new Audio(audioUrl);
            audio.play();
            audio.onended = function () {
              response.forEach(({ results }, index) => {
                if (index !== 0) {
                  results?.forEach((message, index) => {
                    if (index === 0) {
                      if (message === '[silence]') {
                      }
                    } else if (index === 1) {
                      if (message === '[silence]') {
                      } else {
                        const audioUrl2 = `http://208.109.188.242:5003/api/tts?voice=en-us/southern_english_female-glow_tts&text=${message}&vocoder=hifi_gan%2Funiversal_large&denoiserStrength=0.002&noiseScale=0.667&lengthScale=0.85&ssml=false`;
                        // var audio = new Audio(playedAudio);
                        let audio = new Audio(audioUrl2);
                        audio.play();
                      }
                    }
                  });
                }
              });
            };
            /*
            response.forEach((messages, index) => {
              messages?.results.forEach((message, index) => {
                if (index === 0) {
                  if (message === '[silence]') {
                  } else {

                  }
                } else if (index === 1) {
                  if (message === '[silence]') {
                  } else {
                    //setPlayedAudio((prevState) => [...prevState, { from: 'robot', type: 'voice', url: message }]);

                    const audioUrl = `http://208.109.188.242:5003/api/tts?voice=en-us/southern_english_female-glow_tts&text=${message}&vocoder=hifi_gan%2Funiversal_large&denoiserStrength=0.002&noiseScale=0.667&lengthScale=0.85&ssml=false`;
                    debugger;
                    // var audio = new Audio(playedAudio);
                    let audio = new Audio(audioUrl);
                    audio.play();
                    //console.log(audio?.currentTime, audio?.currentSrc);
                    //debugger
                    //audio.pause();
                  }
                }
              });
            });
            */
          }
        } else {
          addToast('success false', { appearance: 'warning' });
        }
      })
      .catch((err) => {
        addToast(err.message, { appearance: 'error' });
        console.log(err?.message);
        setLoading(false);
      });
  };

  console.log(userGreetMessages);

  const handleUserNameToken = async () => {
    setLoading(true);

    const data = nanoid();
    const guestUser = `guest-${data}`;

    setUserNameToken(guestUser);
    localStorage.setItem('userNameToken', guestUser);
    setToggleEnabled(true);

    await axios
      .get(`https://silviaserver.com/SilviaServer/Core/Create?user=${guestUser}&file=SilviaServerChat.sil`)
      .then((resp) => {
        console.log(resp);
        if (resp?.data?.success === true) {
          handleGreetingMessages(guestUser, setLoading);
        } else {
          addToast(resp?.data?.success, { appearance: 'warning' });
        }
      })
      .catch((err) => {
        addToast(err.message, { appearance: 'error' });
        console.log(err?.message);
        setLoading(false);
      });
  };

  const InternetErrMessagenger = () => set_isOnline(navigator.onLine === true); // for do like this shortform

  useEffect(() => {
    interval = setInterval(InternetErrMessagenger, 6000); // call the function name only not with function with call `()`
    return () => {
      clearInterval(interval); // for component unmount stop the interval
    };
  }, []);
  // useEffect(()=> {
  //     debugger
  //     if(silviaOpen === true){
  //         if(chatText === ''){
  //     const interval = setInterval(() => {
  //         handleGreetingMessages(userNameToken, setLoading)
  //     }, 4000);
  //     return () => clearInterval(interval);
  //         }
  //     }
  // },[silviaOpen, userNameToken, chatText, setLoading]);

  const handleSilviaChat = async () => {
    setSilviaOpen(true);

    const checkLocalStorage = localStorage.getItem('userNameToken');

    if (checkLocalStorage) {
      // const release = await fetch(`http://162.244.80.91:10870/SilviaServer/Core/Release?user=${checkLocalStorage}`, {
      //     method: "get",
      //     headers: {
      //         "Content-Type": "application/json",
      //         "x-access-token": "token-value",
      //         'Access-Control-Allow-Origin': '*',
      //     },
      // })
      // const headers = {
      //     "Content-Type": "application/json",
      //     "x-access-token": "token-value",
      //     'Access-Control-Allow-Origin': '*',
      // }
      //
      // const res =   axios.get(`/SilviaServer/Core/Release?user=${checkLocalStorage}`, {headers} )
      //       .then((resp) => {
      //           debugger
      //           console.log(resp)
      //
      //
      //           }
      //       )
      //       .catch((err) => {
      //          debugger
      //           console.log(err?.response)
      //       });
      // localStorage.removeItem('userNameToken');
    } else {
      handleUserNameToken();
    }
  };

  const handleCloseChat = async () => {
    const checkLocalStorage = localStorage.getItem('userNameToken');

    if (checkLocalStorage) {
      await axios
        .get(`https://silviaserver.com/SilviaServer/Core/Release?user=${checkLocalStorage}`)
        .then((resp) => {
          console.log(resp);
          setUserGreetMessages([]);
          setDeleteModalOpen(false);
          setSilviaOpen(false);
          setToggleEnabled(true);
          setChatText('');
          // addToast("Chat Closed Successfully" , { appearance: 'success' });
          localStorage.removeItem('userNameToken');
        })
        .catch((err) => {
          console.log(err?.response);
          addToast(err?.message, { appearance: 'error' });
          setLoading(false);
        });
    } else {
      setSilviaOpen(false);
    }
  };

  useEffect(() => {
    handleCloseChat();
  }, []);

  const handleSwitchChange = (checked) => {
    console.log(`switch to ${checked}`);
    setToggleEnabled(!toggleEnabled);
  };
  const handleChatText = (event) => {
    const text = event.target.value;
    setChatText(text);
    setMicEnabled(false);
  };

  const handleMicPermissions = async () => {
    //
    // navigator.mediaDevices.getUserMedia({audio:true})
    //     .then(function onSuccess(stream) {
    //         const recorder = new MediaRecorder(stream);
    //         debugger
    //
    //         const data = [];
    //         recorder.ondataavailable = (e) => {
    //             data.push(e.data);
    //         };
    //         debugger
    //         recorder.start();
    //         recorder.onerror = (e) => {
    //             debugger
    //             throw e.error || new Error(e.name); // e.name is FF non-spec
    //         }
    //         recorder.onstop = (e) => {
    //             debugger
    //             const audio = document.createElement('audio');
    //             audio.src = window.URL.createObjectURL(new Blob(data));
    //         }
    //         setTimeout(() => {
    //             recorder.stop();
    //         }, 5000);
    //     })
    //     .catch(function onError(error) {
    //         debugger
    //         console.log(error.message);
    //     });

    // navigator.mediaDevices.getUserMedia({
    //     video: false,
    //     audio: true
    // }).then(async function(stream) {
    //   debugger
    //     let recorder = RecordRTC(stream, {
    //         type: 'audio'
    //     });
    //   debugger
    //     recorder.startRecording();
    //     setMicEnabled(!micEnabled);
    //     debugger
    //     const sleep = m => new Promise(r => setTimeout(r, m));
    //     await sleep(3000);
    //     debugger
    //     recorder.stopRecording(function() {
    //         debugger
    //               const dataNew =   window.URL.createObjectURL(new Blob(recorder))
    //         let blobNew = recorder.getBlob();
    //         debugger
    //         const resBlob =   axios.get(`https://208.109.188.242:2700/${blobNew}`)
    //               .then((resp) => {
    //                   debugger
    //                   console.log(resp)
    //
    //
    //                   }
    //               )
    //               .catch((err) => {
    //                  debugger
    //                   console.log(err?.response)
    //               });
    //
    //         invokeSaveAsDialog(blobNew);
    //     });
    // });
    const permissions = navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    permissions
      .then((stream) => {
        setMicEnabled(!micEnabled);
      })
      .catch((err) => {
        setMicEnabled(false);
        addToast(err.message, { appearance: 'error' });
        console.log(`${err.name} : ${err.message}`);
        setLoading(false);
      });
  };

  const handleMessages = async () => {
    setLoading(true);

    await axios
      .get(`https://silviaserver.com/SilviaServer/Core/SetInput?user=${userNameToken}&text=${chatText}`)
      .then((resp) => {
        setUserGreetMessages((prevState) => {
          const latestState = [...prevState, { from: 'me', type: 'text', message: chatText }];
          return latestState;
        });
        console.log(resp);
        setChatText('');
        handleGreetingMessages(userNameToken, setLoading);
      })
      .catch((err) => {
        addToast(err.message, { appearance: 'error' });
        console.log(err?.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setPlayedAudio([]);
  }, [toggleEnabled, silviaOpen]);

  return (
    <ChatBoxScreens
      silviaOpen={silviaOpen}
      loading={loading}
      handleSilviaChat={handleSilviaChat}
      isOnline={isOnline}
      handleChatText={handleChatText}
      chatText={chatText}
      micEnabled={micEnabled}
      handleMicPermissions={handleMicPermissions}
      handleSwitchChange={handleSwitchChange}
      handleGreetingMessages={handleGreetingMessages}
      userGreetMessages={userGreetMessages}
      handleMessages={handleMessages}
      toggleEnabled={toggleEnabled}
      // playList={playList}
      handleCloseChat={handleCloseChat}
      handleShowModal={handleShowModal}
      handleModalCancel={handleModalCancel}
      deleteModalOpen={deleteModalOpen}
      playedAudio={playedAudio}
      deviceName={deviceName}
    />
  );
};

export default ChatBoxContainer;

