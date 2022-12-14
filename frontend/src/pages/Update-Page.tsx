import React, { MutableRefObject, useRef } from 'react';
import { useAppSelector } from '../app/hooks';
import Navbar from '../components/Navbar';
import NoteForm from '../components/note/taskForm/Task-Form';
import Sidebar from '../components/sidebar/Sidebar';
import { useWindowSize } from '../hooks';

const EditPage = () => {
    const sidebarRef = useRef() as MutableRefObject<HTMLDivElement>;
    const { isSidebarShown } = useAppSelector((store) => store.routine);
    const [width] = useWindowSize();

    return (
        <div>
            <Sidebar sidebarRef={sidebarRef} />
            <div style={{ marginLeft: isSidebarShown && width > 1024 ? (sidebarRef.current ? sidebarRef.current.offsetWidth : 336) : 0 }} className="transition-all duration-500 ease-in-out">
                <Navbar />
                <NoteForm />
            </div>
        </div>
    );
};

export default EditPage;
