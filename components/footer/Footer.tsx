import Link from "next/link";
import HorizontalLine from "../horizontalLine/HorizontalLine";

const Footer = ({ isDark }: { isDark?: boolean }) => {
    const year = new Date().getFullYear();

    const FooterLink = ({ href, text }: { href: string; text: string }) => (
        <Link href={href} className="hover-underline-animation hover-underline-animation-dark">{text}</Link>
    )

    const Separator = () => (
        <div className="h-full w-[2px] bg-[var(--p-txt-color)]"></div>
    );

    return ( 
        <footer className={`w-full pb-12 flex flex-col items-center text-[15px] ${isDark ? "bg-[var(--bg-color)] text-white" : "text-[var(--p-txt-color)]"}`}>
            <HorizontalLine height="h-[1px]" width="w-[80%]" color="bg-[#e3e3e3]" />
        
            <div className="flex h-[18px] items-center gap-4 mt-12">
                <FooterLink href="/pomoc" text="Kontakt" />
                <Separator />
                <FooterLink href="/pomoc" text="FAQ" />
                <Separator />
                <FooterLink href="/privatnost" text="Politika privatnosti" />
            </div>

            <p className="mt-2">Razvoj i dizajn: <FooterLink text="BitWise Solutions" href="/" /></p>

            <p className="mt-4">Copyright © {year} nauciProgramiranje.ba | Sva prava pridržana.</p>
        </footer>
     );
}
 
export default Footer;