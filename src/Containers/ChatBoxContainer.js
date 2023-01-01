import React, {useEffect, useState} from 'react'
import ChatBoxScreens from "../Screens/ChatBoxScreens";
import {useToasts} from "react-toast-notifications";
import {nanoid} from "nanoid";


const ChatBoxContainer = () => {
    const {addToast} = useToasts();
    const [silviaOpen, setSilviaOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chatText, setChatText] = useState('');
    const [micEnabled, setMicEnabled] = useState(false);
    const [isOnline, set_isOnline] = useState(true);
    const [toggleEnabled, setToggleEnabled] = useState(false);
    const [userNameToken, setUserNameToken] = useState('');

    let interval = null;

    const handleGreetingMessages = async (guestUser) =>{

        const headers = {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
            'Access-Control-Allow-Origin': '*',
        }

        // const res =   axios.get(`/SilviaServer/Core/GetAll?user=${guestUser}`, {headers})
        //     .then((resp) => {
        //             debugger
        //             console.log(resp)
        //         }
        //     )
        //     .catch((err) => {
        //         debugger
        //         console.log(err?.response)
        //     });

    }

    const handleUserNameToken = async () => {
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
        //

        const headers = {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
            'Access-Control-Allow-Origin': '*',
        }

        // const res =   axios.get(`/SilviaServer/Core/Create?user=${guestUser}&file=SilviaServerChat.sil`, {headers})
        //     .then((resp) => {
        //             debugger
        //             console.log(resp)
        //         handleGreetingMessages(guestUser);
        //
        //         }
        //     )
        //     .catch((err) => {
        //         debugger
        //         console.log(err?.response)
        //     });




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
        setSilviaOpen(!silviaOpen);

        const checkLocalStorage = localStorage.getItem('userNameToken');
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
        setMicEnabled(false)

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


       />
    )
}

export default ChatBoxContainer
