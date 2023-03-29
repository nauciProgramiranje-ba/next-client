import { PopupProps } from "react-popup-manager";
import Logo from "./Logo";
import { IoClose } from "react-icons/io5";
import { MdEmail, MdKey } from "react-icons/md";
import { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";
import capitalizeFirstLetter from "@/lib/util/capitalizeFirstLetter";
import { auth } from "@/lib/firebase/firebase";
import { ClipLoader } from "react-spinners";
import UserContext from "@/lib/context/UserContext";

const RedTop = () => (
    <div className="w-full h-2 bg-[var(--sec-txt-color)] rounded-t-md"></div>
)

interface InputProps {
    icon: ReactNode;
    placeholder: string;
    value: string;
    type: string;
    onChange: Dispatch<SetStateAction<string>>;
}

const Input = (props: InputProps) => {
    const { icon, placeholder, value, onChange, type } = props;
    
    return (
        <div className="w-full relative">
            {icon}
            <input type={type} value={value} onChange={e => onChange(e.target.value)}
            className="text-sm w-full shadow-md p-2 pl-8 border-[1px] rounded-md" placeholder={placeholder} />
        </div>
    );
}

const Modal = ({ onClose } : PopupProps) => {
    const [email, setEmail] = useState<string>(''); // Email input
    const [password, setPassword] = useState<string>(''); // Password input
    const [submitMessage, setSubmitMessage] = useState<string>(''); // Message text
    const [isDisabled, setIsDisabled] = useState<boolean>(false); // Button disabled
    
    const iconClassName = "absolute top-[9px] left-2 text-xl text-[var(--bg-color)]"; // className for icons in input

    useEffect(() => { // Show error message
        if(!submitMessage) return;

        if(submitMessage !== "Processing") {
            toast.error(submitMessage);
        }
    }, [submitMessage])

    const login = () => { // Login logic
        setSubmitMessage("Processing");

        signInWithEmailAndPassword(auth, email, password)
        .catch((error) => {
            setSubmitMessage(capitalizeFirstLetter(error.code.substr(error.code.indexOf("/") + 1).replace(/-/g, " ")));
            setIsDisabled(false);
        });
    }

    return(
        <div onClick={(e) => e.stopPropagation()}
            className="bg-white shadow-md rounded-md animate__animated animate__slideInRight animate__faster w-[380px]">
            <RedTop />

            <div className="w-full p-2 flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl">Prijavite se</h2>
                <Logo simple={true} />
                <p className="text-center text-[var(--bg-color)] text-sm font-light my-4">Prijavite se da spremite svoj rad. <br/>Mi nećemo postavljati ništa nigdje.</p>
                
                <div className="absolute top-2 right-2 text-xl cursor-pointer" onClick={onClose}>
                    <IoClose /> 
                </div>

                <Input icon={<MdEmail className={iconClassName }/>} value={email} onChange={setEmail} placeholder="Email" type="text" />
                <Input icon={<MdKey className={iconClassName} />} value={password} onChange={setPassword} placeholder="Password" type="password" />

                <button onClick={login} disabled={isDisabled}
                    className="w-full p-2 shadow-md rounded-md bg-[var(--ter-bg-color)] hover:bg-[var(--ter-bg-hover-color)] text-white transition-all duration-300">
                    {submitMessage === "Processing" ? <ClipLoader color="#fff" size={14} className="mt-1" /> : "Prijavi se"}
                </button>
            </div>
        </div>
    );
}

const LoginModal = (props: PopupProps) => {
    const { isOpen, onClose } = props;
    const { user } = useContext(UserContext);

    useEffect(() => {
        if(!onClose) return;
        if(user) onClose();
    }, [user, onClose])

    return isOpen && !user ? ( 
        <div onClick={onClose}
        className="fixed w-full h-screen bg-black/50 z-50 grid place-items-center animate__animated animate__fadeIn animate__faster">
            <Modal onClose={onClose} />
        </div>
     ) : null;
}
 
export default LoginModal;