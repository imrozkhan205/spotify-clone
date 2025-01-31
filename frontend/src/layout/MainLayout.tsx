import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar"
import FriendsActivity from "./FriendsActivity"
import AudioPlayer from "./components/AudioPlayer"
import { PlaybackControls } from "./components/PlaybackControls"
import { useEffect, useState } from 'react';

const MainLayout = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=>{
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, [])
    
    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <ResizablePanelGroup 
                direction="horizontal" 
                className="flex h-full overflow-hidden p-2"
            >
                <AudioPlayer  />
                {/*Left side bar component*/}
                <ResizablePanel 
                    defaultSize={20} 
                    minSize={isMobile ? 0 : 10} 
                    maxSize={30}
                    className="min-w-[50px]" // Ensure minimum width
                >
                    <LeftSidebar />
                </ResizablePanel>

                <ResizableHandle className="w-2 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg">
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="w-1 h-8 rounded-full bg-zinc-600" />
                    </div>
                </ResizableHandle>

                {/* Main content */}
                <ResizablePanel 
                    defaultSize={isMobile ? 80 : 60}
                    className="min-w-[200px]" // Ensure minimum width
                >
                    <Outlet />
                </ResizablePanel>

                {!isMobile && (
                    <>
                    <ResizableHandle className="w-2 bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-lg">
                    <div className="h-full w-full flex items-center justify-center">
                        <div className="w-1 h-8 rounded-full bg-zinc-600" />
                    </div>
                </ResizableHandle>

                <ResizablePanel 
                    defaultSize={20} 
                    minSize={0} 
                    maxSize={25} 
                    collapsedSize={0}
                    className="min-w-[0px]" // Ensure minimum width
                >
                    <FriendsActivity />
                </ResizablePanel>
                    </>
                )}
                
            </ResizablePanelGroup>
            <PlaybackControls />
        </div>
    )
}

export default MainLayout