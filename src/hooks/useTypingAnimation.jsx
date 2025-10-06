import React, { useEffect, useState } from 'react'

function useTypingAnimation(message) {
    const tempmessage = message;
    const [animatedmessage, setAnimatedmessage] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (animatedmessage.length < tempmessage.length) {
                setAnimatedmessage(e =>
                    e + tempmessage.charAt(animatedmessage.length))
            }
        }, 100);
    }, [animatedmessage])

    return animatedmessage;

}

export default useTypingAnimation