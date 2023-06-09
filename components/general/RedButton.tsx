import { BtnType } from "@/lib/types/BtnType";
import Link from "next/link";

const RedButton = (props: BtnType) => {
    const { btnText, btnIcon, btnAction, reversed, animated } = props;

    return ( 
        <Link href={btnAction} 
        className={`bg-[var(--sec-txt-color)] hover:bg-[var(--ter-txt-color)] transition-all 
        duration-300 flex items-center gap-3 w-fit py-3 px-10 shadow-md rounded-md
        ${animated && "animate__animated animate__zoomIn animate__faster"} text-white ${reversed && "flex-row-reverse"}`}>
            {btnIcon}
            {btnText}
        </Link>
    );
}

export default RedButton;