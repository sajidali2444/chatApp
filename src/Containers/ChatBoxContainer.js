import React, {useEffect, useState} from 'react'
import ChatBoxScreens from "../Screens/ChatBoxScreens";
import {useToasts} from "react-toast-notifications";
import {nanoid} from "nanoid";
import axios from "axios";


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
    // { from: "", type: "", message: "" }
    let interval = null;

    const handleGreetingMessages = async (guestUser, typeData) =>{
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

        const res =   axios.get(`/SilviaServer/Core/GetAll?user=${guestUser}`, {headers})
            .then((resp) => {
                    debugger
                    console.log(resp)
                if (typeData === 'firstType'){
                    debugger
                    const { response } = resp?.data;
                    if (response.length > 0) {
                        response.map((message, index) => {
                            if (index === 0) {
                                setUserGreetMessages((prevState) => {
                                    const latestState = prevState;
                                    prevState.push({from: 'robot', type: 'text', message: message});
                                })
                            }
                        })
                    }
                    resp?.data?.response?.map((data)=>

                        data?.results?.map((getData, index)=>
                            index === 0 ?
                                setUserGreetMessages( (prevState) => {
                                    console.log(prevState);
                                    console.log( prevState.push({from: 'robot', type: 'text', message: getData}));
                                    return [];
                                })
                                :
                                index === 1 ?
                                    setUserGreetMessages([ ...userGreetMessages, {from: 'robot', type: 'voice', url: getData}])
                                    :
                                    null


                        )

                    )

                }else{
debugger
                    resp?.data?.response?.map((data)=>

                        data?.results?.map((getData, index)=>
                            index === 0 ?
                                setUserGreetMessages([...userGreetMessages, {from: 'robot', type: 'text', message: getData}])
                                :
                                index === 1 ?
                                    setUserGreetMessages([...userGreetMessages, {from: 'robot', type: 'text', url: getData}])
                                    :
                                    null


                        )

                    )

                }

                debugger


                }
            )
            .catch((err) => {
                debugger
                addToast(err.message , { appearance: 'error' });
                console.log(err?.message)
            });

    }
debugger
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
                    handleGreetingMessages(guestUser, "firstType");
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

    const handleMicPermissions = () => {

        const permissions = navigator.mediaDevices.getUserMedia({audio: true, video: false})
        permissions.then((stream) => {
            setMicEnabled(!micEnabled);
        }).catch((err) => {

            setMicEnabled(false);
            addToast(err.message , { appearance: 'error' });

            console.log(`${err.name} : ${err.message}`)
        });
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
                    console.log(resp)
                handleGreetingMessages(userNameToken);
                        debugger



                }
            )
            .catch((err) => {
                debugger
                addToast(err.message , { appearance: 'error' });
                console.log(err?.message)
            });



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


       />
    )
}

export default ChatBoxContainer
