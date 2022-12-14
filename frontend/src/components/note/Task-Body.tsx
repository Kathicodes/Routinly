import React from 'react';
import ITask from '../../interfaces/task';
import { getDifferentColor, sanitizedData } from '../../utils/functions';
import NoteInfo from './Task-Info';
import { dateDiffInDays } from '../../utils/functions';
import { AiFillStar } from 'react-icons/ai';
import { defaultNoteTypes } from '../../utils/data';

interface TaskBodyProps {
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onClick?: () => void;
    bgColor?: string;
    titleClassName?: string;
    contentClassName?: string;
    className?: string;
    note: ITask;
    showImage?: boolean;
}

const TaskBody = ({ onMouseEnter, onMouseLeave, onClick, bgColor, titleClassName, className, contentClassName, note, showImage }: TaskBodyProps) => {
    const taskTime = dateDiffInDays(new Date(note.startDate), new Date(note.endDate)) + 1;

    return (
        <div
            className={`note__preview relative rounded-lg shadow-md sm:pt-4 sm:pb-2 pt-3 pb-1 sm:px-8 px-6 transition-colors flex-between ${className}`}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            style={{ backgroundColor: bgColor || note.color, color: getDifferentColor(note.color, 185) }}
        >
            <div className="w-full">
                <h3 className={`sm:text-3xl text-2xl font-bold mb-1 cursor-auto ${titleClassName}`}>{note.title}</h3>

                {note.content && !note.isEndNote && (
                    <>
                        <div
                            dangerouslySetInnerHTML={{ __html: sanitizedData(note.content.length > 150 ? note.content.slice(0, 150).concat('...') : note.content) }}
                            className={`sm:px-2 px-1 break-words sm:text-[1.25rem] text-lg min-h-[1.5rem] overflow-y-auto sm:!leading-6 !leading-5 max-h-32 h-auto ${contentClassName}`}
                        ></div>
                    </>
                )}
                <div className={`mt-2 text-lg flex-between ${taskTime >= 2 ? 'mr-16' : ''}`}>
                    <div>
                        {note.isStarred && <NoteInfo text={<AiFillStar className="text-[1.9rem] inline-block text-center pb-1" />} color={note.color} />}
                        <NoteInfo text={`${note.rating}/10`} color={note.color} className="tracking-widest" />
                        <NoteInfo text={note.type ? note.type.labelName : defaultNoteTypes[0].labelName} color={note.color} />
                        {note.category?.map((category) => {
                            if (!category) return null;
                            return <NoteInfo text={category.labelName} key={category._id} color={note.color} />;
                        })}
                    </div>
                    {taskTime >= 2 && (
                        <div className="absolute sm:bottom-2 bottom-1 right-0 z-10">
                            <NoteInfo text={`${taskTime} days`} color={note.color} className={`${note.isEndNote ? 'font-bold' : ''}`} />
                        </div>
                    )}
                    {note.isEndNote && (
                        <div className="absolute top-2 right-0 z-10">
                            <NoteInfo text="Ended" color={note.color} className="font-bold" />
                        </div>
                    )}
                </div>
            </div>
            {note.image && showImage && note.isEndNote && <div className="sm:w-64 w-56 sm:h-24 h-20 note__image rounded-md ml-4" style={{ backgroundImage: `url(${note.image})` }}></div>}
        </div>
    );
};

export default TaskBody;
