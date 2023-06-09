import ActionButton from "@/components/general/ActionButton";
import Container from "@/components/general/Container";
import PageDetails from "@/components/header/PageDetails";
import { getChapters } from "@/lib/chapters/chapters";
import UserContext from "@/lib/context/UserContext";
import { Chapter } from "@/lib/types/Chapter";
import { Stats } from "@/lib/types/Stats";
import Head from "next/head";
import Link from "next/link";
import { ReactNode, useEffect, useState, useContext } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiMovie } from "react-icons/bi";
import { BsArrowRight, BsListCheck, BsPencil } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { MoonLoader, PulseLoader } from "react-spinners";

const Content = () => {
    const { user } = useContext(UserContext)

    const [chapters, setChapters] = useState<Array<Chapter>>();

    useEffect(() => { // Get chapters
        getChapters(setChapters);
    }, [])

    interface ChapterDetailProps {
        icon: ReactNode;
        stat: string;
        value: number;
    }

    interface ProgressProps {
        id: string;
        icon: ReactNode;
        title: string;
    }

    const ChapterDetail = ({ icon, stat, value }: ChapterDetailProps) => (
        <div className="flex items-center justify-center gap-2">
            <div className="bg-[#f21b3f1a] grid place-items-center p-2 rounded-md shadow-md">
                {icon}
            </div>
            <span className="font-semibold">{value} {stat}</span>
        </div>
    )

    const AdvanceBtn = ({ id }: { id: string }) => (
        <Link href={user?.isCoursePaid ? `/kurs/${id}` : ""} className={`flex items-center justify-center
        gap-2 text-white px-4 py-2 w-fit h-fit shadow-md transition-all rounded-md 
        ${user?.isCoursePaid ? "bg-[var(--bg-color)] hover:bg-[var(--ter-bg-color)]" : "cursor-not-allowed bg-[var(--disabled-btn-color)]"}`}>
            Započni <BsArrowRight />
        </Link>
    )

    const ChapterProgress = ({ id, icon, title }: ProgressProps) => {
        const ProgressBar = () => (
            <div className="flex items-center gap-4">
                <div className="bg-white h-2 rounded-md w-full"></div> 
                <span className="font-semibold">{"0%"}</span>
            </div>
        )

        return (
            <div className="p-4 bg-gray-100 rounded-md shadow-md grid grid-cols-2">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-4">
                        {icon}
                        <span className="text-lg text-[var(--title-txt-color)]">{title}</span>
                    </div>
                    <ProgressBar />
                </div>

                <div className="flex items-center justify-end">
                    <AdvanceBtn id={id} /> 
                </div>
            </div>
        )
    }

    const ChapterInfo = ({ id, title, description, chapterNumber, durationInHrs, lessonsNumber, tasksNumber }: Chapter) => {
        const detailIconStyle = "text-[var(--ter-txt-color)] text-lg";
        const progressIconStyle = "text-[var(--title-txt-color)] text-4xl";

        return (
            <div className="bg-white shadow-md rounded-md p-6 flex flex-col gap-4">
                <h2 className="text-2xl text-[var(--title-txt-color)]">{chapterNumber} - {title}</h2>

                <div className="flex items-center gap-8">
                    {
                        lessonsNumber > 0 ?
                        (
                            <>
                                <ChapterDetail 
                                    icon={<AiOutlineClockCircle className={detailIconStyle} />}
                                    stat="Sati" 
                                    value={durationInHrs} />
                                <ChapterDetail 
                                    icon={<BiMovie className={detailIconStyle} />}
                                    stat="Lekcija" 
                                    value={lessonsNumber} />
                            </>
                        ) : (
                            <div className="py-4">
                                <div className="flex items-end">
                                    <h2 className="font-semibold text-2xl text-[var(--title-txt-color)]">USKORO</h2>
                                    <PulseLoader size={4} className="pb-1" speedMultiplier={0.6} />
                                </div>
                                <p className="text-[var(--title-txt-color)]">Poglavlje u izradi.</p>
                            </div>
                        )
                    }
                    {
                        tasksNumber > 0 && 
                        <ChapterDetail 
                            icon={<BsPencil className={detailIconStyle} />} 
                            stat="Zadataka"
                            value={tasksNumber} />
                    }
                </div>

                <p>{description}</p>

                {
                    lessonsNumber > 0 && 
                        <ChapterProgress 
                            id={id.value} 
                            icon={<BiMovie className={progressIconStyle} />} 
                            title="Lekcije" />
                }
                {
                    tasksNumber > 0 && 
                        <ChapterProgress 
                            id={id.value} 
                            icon={<BsListCheck className={progressIconStyle} />} 
                            title="Zadaci" />
                }
            </div>
        )
    }
    
    const ChaptersContainer = () => (
        <div className="flex flex-col gap-6">
            {
                chapters ? chapters.map((chapter, index) => (
                    <ChapterInfo 
                        key={index} 
                        id = {chapter.id}
                        title={chapter.title} 
                        description={chapter.description}
                        chapterNumber={chapter.chapterNumber}
                        durationInHrs={chapter.durationInHrs}
                        lessonsNumber={chapter.lessonsNumber}
                        tasksNumber={chapter.tasksNumber} />
                )) : (
                    <div className="w-full h-full grid place-items-center">
                        <MoonLoader color="#f21b3f" size={90} speedMultiplier={0.75} />
                    </div>
                )
            }
        </div>
    )

    const CourseProgress = () => {
        const Progress = () => (
            <div className="rounded-full border-[14px] w-36 h-36 grid place-items-center">  
                <p className="text-2xl">0%</p>
            </div>
        )

        const Stats = ({title, completed, total}: Stats) => (
            <div className="text-center">
                <h3>{title}</h3>
                <p className="font-semibold">{completed} / {total}</p>
            </div>
        )

        return (
            <div className="bg-white rounded-md shadow-md p-6 pt-28 h-fit flex flex-col items-center gap-6 sticky top-8 mt-6">
                <div className="bg-[var(--ter-bg-color)] w-3/4 grid place-items-center h-28 absolute -top-6 shadow-md rounded-md">
                    <TbCertificate className="text-white text-6xl" />
                </div>

                <h2 className="text-xl text-[var(--title-txt-color)]">Certifikat</h2>

                <Progress />

                <Stats 
                    title="Pređene lekcije" 
                    completed={0} 
                    total={chapters ? chapters.map(c => c.lessonsNumber).reduce((a, b) => a + b, 0) : 0} />
                <Stats 
                    title="Riješeni zadaci" 
                    completed={0} 
                    total={chapters ? chapters.map(c => c.tasksNumber).reduce((a, b) => a + b, 0) : 0} />

                <p className="text-sm mb-8 font-light text-center italic">Otključajte nauciProgramiranje.ba certifikat kada uspješno završite sve zadatke na platformi.</p>
 
                <div className="w-3/4 absolute -bottom-4">
                    <ActionButton 
                        text="Otključaj certifikat"
                        action={() => {}} 
                        disabled={true} />
                </div>
            </div>
        )
    }

    return ( 
        <>
            <Head>
                <title>Sadržaj | nauciProgramiranje.ba</title>
                <meta name="description" content="Prva domaća platforma posvećena podučavanju programiranja. Najbolji način da što prije postanete softverski inžinjer." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <PageDetails
                    title='Ultimativna platforma'
                    description='Sve što treba da naučite programirati na jednom mjestu. Stvarno.'
                    hasCode={false}
                    btn={{
                        btnText: 'Upiši se na kurs',
                        btnIcon: <FaCreditCard />,
                        btnAction: '/kupovina'
                    }}
                />

                <Container>
                    <div className="grid grid-cols-[260px_1fr] gap-6 w-full">
                        <CourseProgress />
                        <ChaptersContainer />
                    </div>
                </Container>
            </main>
        </>
     );
}
 
export default Content;