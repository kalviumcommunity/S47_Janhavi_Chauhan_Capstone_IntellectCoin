import React, { useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import { ChevronDown } from "lucide-react"; 
import { Link, useNavigate } from "react-router-dom";
import QuickBox from "./Quickbox";
import 'tailwindcss/tailwind.css'; 

export default function Header() {
    const [currentUser, setCurrentUser] = useState(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const progressBarHandler = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scroll = totalScroll / windowHeight;
            setScroll(scroll);
        };

        window.addEventListener("scroll", progressBarHandler);
        return () => window.removeEventListener("scroll", progressBarHandler);
    }, []);

    const data = [
        {
            heading: "Profile",
            icon: FaUserShield,
            action: () => {
                navigate("/profile");
            },
        },
        {
            heading: "Logout",
            icon: FaUserShield,
            action: () => {
                setCurrentUser(null);
                window.location.reload();
            },
        },
    ];

    const authData = [
        {
            heading: "Sign in",
            icon: FaUserShield,
            action: () => {
                navigate("/sign-in");
            },
        },
        {
            heading: "Sign up",
            icon: FaUserShield,
            action: () => {
                navigate("/sign-up");
                window.location.reload();
            },
        },
    ];

    return (
        <div className="sticky top-0 w-full bg-[#FEFEFA] py-1 mx-auto font-poppins z-50">
            <div className="relative mx-auto flex max-w-[1280px] items-center justify-between px-2 py-2 sm:px-6 lg:px-8">
                <div className="inline-flex items-center space-x-2">
                    <span className="overflow-hidden ">
                       <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" className="h-8 w-8/12" />
                    </span>
                    <Link to="/">
                        <span className="font-normal hover:text-[#8800ff] text-[18px] lg:text-xl">
                            Inspiration App
                        </span>
                    </Link>
                </div>
                <div className="hidden lg:block">
                    {/* Your menu items */}
                </div>
                <div className="hidden lg:flex">
                    <div className="flex gap-2">
                        {currentUser ? (
                            <>
                                {/* Dashboard button */}
                                <div className="relative w-full h-full flex justify-center items-center">
                                    {/* Profile dropdown */}
                                    <div
                                        onClick={() => {
                                            setShow(!show);
                                        }}
                                        className="cursor-pointer relative">
                                        {/* Profile picture or icon */}
                                        <ChevronDown className="inline-block absolute bottom-[-8%] right-[-18%] bg-gray-200 backdrop-blur-sm h-4 w-4 rounded-full bg-opacity-60" />
                                    </div>
                                    {show && <QuickBox Options={data} side={"right"} />}
                                </div>
                            </>
                        ) : (
                            <div className="flex">
                                <div
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className="relative mr-3 rounded-md px-3 py-2 text-[15px] font-normal bg-transparent text-black border-2 border-[#8800ff]  hover:border-[#8800ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                                    Join Now{" "}
                                    <MdOutlineVerified className="inline-block h-5 w-5 ml-1" />
                                    {show && <QuickBox Options={authData} side={"left"} />}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div id="progressBarContainer">
                    <div
                        id="progressBar"
                        style={{
                            transform: `scale(${scroll}, 1)`,
                            opacity: `${scroll}`,
                            background: `linear-gradient(50deg, blue 0%, blue ${
                                scroll * 100
                            }%, transparent ${scroll * 100}%, transparent 100%)`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
