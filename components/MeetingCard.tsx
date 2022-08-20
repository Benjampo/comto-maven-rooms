import React, {Fragment, useEffect, useState} from 'react';
import {CalendarIcon, ClockIcon, DotsHorizontalIcon, LocationMarkerIcon} from "@heroicons/react/solid";
import {Menu, Transition} from "@headlessui/react";
import {useUserContext} from "../lib/UserContext";
import {db } from "../lib/firebase";
import {deleteDoc } from "@firebase/firestore";
import {collection, doc, getDoc } from "firebase/firestore";
import {useMeetingContext} from "../lib/MeetingsContext";
import {query} from "@firebase/database";
const days = [
    { date: '2021-12-27' },
    { date: '2021-12-28' },
    { date: '2021-12-29' },
    { date: '2021-12-30' },
    { date: '2021-12-31' },
    { date: '2022-01-01', isCurrentMonth: true },
    { date: '2022-01-02', isCurrentMonth: true },
    { date: '2022-01-03', isCurrentMonth: true },
    { date: '2022-01-04', isCurrentMonth: true },
    { date: '2022-01-05', isCurrentMonth: true },
    { date: '2022-01-06', isCurrentMonth: true },
    { date: '2022-01-07', isCurrentMonth: true },
    { date: '2022-01-08', isCurrentMonth: true },
    { date: '2022-01-09', isCurrentMonth: true },
    { date: '2022-01-10', isCurrentMonth: true },
    { date: '2022-01-11', isCurrentMonth: true },
    { date: '2022-01-12', isCurrentMonth: true, isToday: true },
    { date: '2022-01-13', isCurrentMonth: true },
    { date: '2022-01-14', isCurrentMonth: true },
    { date: '2022-01-15', isCurrentMonth: true },
    { date: '2022-01-16', isCurrentMonth: true },
    { date: '2022-01-17', isCurrentMonth: true },
    { date: '2022-01-18', isCurrentMonth: true },
    { date: '2022-01-19', isCurrentMonth: true },
    { date: '2022-01-20', isCurrentMonth: true },
    { date: '2022-01-21', isCurrentMonth: true },
    { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
    { date: '2022-01-23', isCurrentMonth: true },
    { date: '2022-01-24', isCurrentMonth: true },
    { date: '2022-01-25', isCurrentMonth: true },
    { date: '2022-01-26', isCurrentMonth: true },
    { date: '2022-01-27', isCurrentMonth: true },
    { date: '2022-01-28', isCurrentMonth: true },
    { date: '2022-01-29', isCurrentMonth: true },
    { date: '2022-01-30', isCurrentMonth: true },
    { date: '2022-01-31', isCurrentMonth: true },
    { date: '2022-02-01' },
    { date: '2022-02-02' },
    { date: '2022-02-03' },
    { date: '2022-02-04' },
    { date: '2022-02-05' },
    { date: '2022-02-06' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
function MeetingCard({ meeting }) {
    const [isCurrentUserMeeting, setIsCurrentUserMeeting] = useState(false)
    const {user} = useUserContext()
    const {getMeetings} = useMeetingContext()
    const [author, setAuthor] = useState()

    useEffect(() => {
        checkMeeting();

    }, [])
    useEffect(() => {

        getUserInfos();
    }, [])
    const checkMeeting = () => {
       if (user.uid === meeting.author) {
           setIsCurrentUserMeeting(true)
       } else {
           setIsCurrentUserMeeting(false)
       }
    }
    const deleteMeeting = async () => {
        await deleteDoc(doc(db, "meetings", meeting.id))
    }
    const getUserInfos =  () => {
        const usersRef = doc(db, 'users', meeting.author)

        getDoc(usersRef).then((doc) => {
            console.log(doc.data())
            setAuthor(doc.data())
        })
    }

    return (
        <li key={meeting.id} className="relative flex space-x-6 py-6 xl:static">
            <img src={author?.image} alt="" className="h-14 w-14 flex-none rounded-full" />
            <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{author?.name}</h3>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                    <div className="flex items-start space-x-3">
                        <dt className="mt-0.5">
                            <span className="sr-only">Date</span>
                            <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd>
                            <time dateTime={meeting.day}>
                                {meeting.day}
                            </time>
                        </dd>
                    </div>
                    <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                        <dt className="mt-0.5">
                            <span className="sr-only">Location</span>
                            <ClockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </dt>
                        <dd>{meeting.startHour} - {meeting.endHour}</dd>
                    </div>
                </dl>
            </div>
            {isCurrentUserMeeting && (<Menu as="div" className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center">
                <div>
                    <Menu.Button className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <DotsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="focus:outline-none absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                            <Menu.Item>
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Edit
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={deleteMeeting}
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        <span>Cancel</span>
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>)
            }
        </li>
    );
}

export default MeetingCard;
