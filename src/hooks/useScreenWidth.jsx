import {useState,useEffect} from 'react'

function useScreenWidth() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const updateScreenSize = () => {
        setScreenWidth(window.innerWidth);
      };

    useEffect(() => {
        window.addEventListener("resize", updateScreenSize);
        return () => {
            window.removeEventListener("resize", updateScreenSize);
        }
    }, []);

    return screenWidth;
}

export default useScreenWidth