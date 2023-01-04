import React, {useEffect, useState} from 'react'
import ChatBoxScreens from "../Screens/ChatBoxScreens";
import {useToasts} from "react-toast-notifications";
import {nanoid} from "nanoid";
import axios from "axios";
import {message} from "antd";
import RecordRTC from 'recordrtc';
import {invokeSaveAsDialog} from 'recordrtc';


const ChatBoxContainer = () => {
    const {addToast} = useToasts();
    const [silviaOpen, setSilviaOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chatText, setChatText] = useState('');
    const [micEnabled, setMicEnabled] = useState(false);
    const [isOnline, set_isOnline] = useState(true);
    const [toggleEnabled, setToggleEnabled] = useState(false);
    const [userNameToken, setUserNameToken] = useState('');
    const [userGreetMessages, setUserGreetMessages] = useState([]);
    // const [playList, setPlayList] = useState({});
    // const [playList, setPlayList] = useState({
    //     isRecording: false,
    //     blobURL: '',
    //     isBlocked: playListfalse,
    // });

    // { from: "", type: "", message: "" }


    useEffect(()=> {

    })
    let interval = null;

    const handleGreetingMessages = async (guestUser, setChatText) =>{
        debugger
        const headers = {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
            'Access-Control-Allow-Origin': '*',
        }
        //
        // const messages = [
        //     { from: "robot", type: "text", message: "Hi" },
        //     { from: "robot", type: "audio", url: "url" },
        //     { from: "me", message: "Hello" },
        // ];
        setChatText('');

        const res =   axios.get(`/SilviaServer/Core/GetAll?user=${guestUser}`, {headers})
            .then((resp) => {
                console.log(resp?.data, "getUser resoponse");
                const { response } = resp?.data;
                if (response.length > 0) {
                    response.map((messages, index) => {
                        const { results } = messages;
                        results.map((message, index) => {
                            if (index === 0) {
                                if(message === "[silence]"){

                                }else{
                                    setUserGreetMessages((prevState) => {
                                        const latestState = [...prevState, {from: 'robot', type: 'text', message: message}]
                                        return latestState;
                                    })
                                }

                            } else if (index === 1) {
                                if(message === "[silence]"){

                                }else{
                                    debugger
                                    //
                                    //     const resVoice =   axios.get(`/api/tts?voice=en-us%2Fharvard-glow_tts&text=Welcome%20to%20the%20world%20of%20speech%20synthesis%21&vocoder=hifi_gan%2Funiversal_large&denoiserStrength=0.002&noiseScale=0.667&lengthScale=0.85&ssml=false`)
                                    //     .then((resp) => {
                                    //             debugger
                                    //             console.log(resp, "voice reponse")
                                    //
                                    //
                                    //         }
                                    //     )
                                    //     .catch((err) => {
                                    //         debugger
                                    //         addToast(err.message , { appearance: 'error' });
                                    //         console.log(err?.message)
                                    //     });



                                    setUserGreetMessages((prevState) => {
                                    const latestState = [...prevState, {from: 'robot', type: 'voice', url: message}]
                                    return latestState;
                                })
                                    }
                            }
                        })
                    })
                }

                }
            )
            .catch((err) => {
                debugger
                addToast(err.message , { appearance: 'error' });
                console.log(err?.message)
            });

    }

    console.log(userGreetMessages);

    const handleUserNameToken = async () => {
        debugger
        setLoading(true);

        const data = nanoid();
        const guestUser = `guest-${data}`;

        setUserNameToken(guestUser);
        localStorage.setItem('userNameToken', guestUser);

        // const res = await fetch(`http://162.244.80.91:10870/SilviaServer/Core/Create?user=${guestUser}&file=SilviaServerChat.sil`, {
        //     method: "post",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "x-access-token": "token-value",
        //     },
        // })

        const headers = {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
            'Access-Control-Allow-Origin': '*',
        }

        const res =   axios.get(`/SilviaServer/Core/Create?user=${guestUser}&file=SilviaServerChat.sil`, {headers})
            .then((resp) => {
                    debugger
                    console.log(resp)
                if(resp?.data?.success === true){
                    debugger
                    handleGreetingMessages(guestUser, setChatText);
                }else{
                    debugger
                    addToast(resp?.data?.success , { appearance: 'warning' });

                }

                }
            )
            .catch((err) => {
                debugger
                addToast(err.message , { appearance: 'error' });
                console.log(err?.message)
            });




        setLoading(false);

    }


    const InternetErrMessagenger = () => set_isOnline(navigator.onLine===true); // for do like this shortform

    useEffect(()=>{
        interval = setInterval(InternetErrMessagenger, 6000); // call the function name only not with function with call `()`
        return ()=>{
            clearInterval(interval) // for component unmount stop the interval
        }
    },[]);


    const handleSilviaChat = async () => {
        debugger
        setSilviaOpen(!silviaOpen);

        const checkLocalStorage = localStorage.getItem('userNameToken');
        debugger
        if(checkLocalStorage){

            setUserNameToken(checkLocalStorage);

            // const release = await fetch(`http://162.244.80.91:10870/SilviaServer/Core/Release?user=${checkLocalStorage}`, {
            //     method: "get",
            //     headers: {
            //         "Content-Type": "application/json",
            //         "x-access-token": "token-value",
            //         'Access-Control-Allow-Origin': '*',
            //     },
            // })
            const headers = {
                "Content-Type": "application/json",
                "x-access-token": "token-value",
                'Access-Control-Allow-Origin': '*',
            }
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
        }else{

            handleUserNameToken();
        }
    }

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
        // const permissions = navigator.mediaDevices.getUserMedia({audio: true, video: false})
        // permissions.then((stream) => {
        //     setMicEnabled(!micEnabled);
        //     setPlayList({isBlocked: false});
        // }).catch((err) => {
        //
        //     setMicEnabled(false);
        //     addToast(err.message , { appearance: 'error' });
        //     setPlayList({isBlocked: true});
        //     console.log(`${err.name} : ${err.message}`)
        // });
    }

    const handleMessages = () => {
        debugger
        const headers = {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
            'Access-Control-Allow-Origin': '*',
        }
        debugger
        const res =   axios.get(`/SilviaServer/Core/SetInput?user=${userNameToken}&text=${chatText}`, {headers})
            .then((resp) => {
                    debugger
                setUserGreetMessages((prevState) => {
                    const latestState = [...prevState, {from: 'me', type: 'text', message: chatText}]
                    return latestState;
                })
                    console.log(resp)
                handleGreetingMessages(userNameToken, setChatText);

                        debugger



                }
            )
            .catch((err) => {
                debugger
                addToast(err.message , { appearance: 'error' });
                console.log(err?.message)
            });



    }


    const handleStartMic = ( )=> {

    }

    return(
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

       />
    )
}

export default ChatBoxContainer
