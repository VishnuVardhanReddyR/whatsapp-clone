import moment from 'moment';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Message = ({ user, message }) => {
    const [userLoggedIn] = useAuthState(auth);

  return (
    <div className="z-0">
        {user === userLoggedIn.email ? (
            <p className="w-fit p-4 rounded-lg m-3 min-w-32 pb-8 relative items-right ml-auto bg-[#dcf8c6]">{message.message}
                <span className="text-gray-500 p-3 text-[9px] absolute bottom-0 text-right right-0">
                    {message.timestamp ? moment(message.timestamp).format("LT") : '...' }
                </span> 
            </p>
            ):(
                <p className="w-fit p-4 rounded-lg m-3 min-w-16 pb-8 relative items-right bg-[#f5f5f5] text-left">{message.message}
                <span className="text-gray-500 p-3 text-[9px] absolute bottom-0 text-right right-0">
                    {message.timestamp ? moment(message.timestamp).format("LT") : '...' }
                </span>
            </p>
        )}
    </div>
  )
}

export default Message;
