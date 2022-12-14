import {Fragment, useEffect, useState} from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import Link from "next/link";
import {addDoc, getDocs} from "firebase/firestore";
import {meetingsRef} from "../lib/firebase";
import {useUserContext} from "../lib/UserContext";
import {useRouter} from "next/router";
import DateItem from "../components/DateItem";
import MeetingCard from "../components/MeetingCard";
import {useMeetingContext} from "../lib/MeetingsContext";

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
    { date: '2022-01-21', isCurrentMonth: true, isSelected: true },
    { date: '2022-01-22', isCurrentMonth: true },
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

export default function New() {
    const [meetingType, setMeetingType] = useState('')
    const [room, setRoom] = useState('')
    const [day, setDay] = useState('')
    const [startHour, setStartHour] = useState(null)
    const [endHour, setEndHour] = useState(null)
    const {user} = useUserContext();
    const { meetings } = useMeetingContext();

    const router = useRouter()
    useEffect(() => {
        console.log(meetingType)
    }, [meetingType])

    const addMeeting = async(e) => {
        e.preventDefault()
        await addDoc(meetingsRef, {
            author: user.uid,
            day:day,
            startHour :startHour,
            endHour:endHour,
            room: room,
            meetingType: meetingType,
        }).then(() => {
            router.push('/')
        })
    }
    const handleHour = () => {
        setStartHour()
    }

    return (
        <main className="flex flex-row justify-between align-middle">
        <div className="w-2/4 m-8">
            <div className="max-w-3xl mx-auto">{<form className="space-y-8 divide-y divide-gray-200">

                    <div>
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Nouvelle r??servation</h3>
                        </div>
                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Type de meeting
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        id="meetingType"
                                        name="meetingType"
                                        onChange={(e) => setMeetingType(e.target.value)}
                                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option>Workshop</option>
                                        <option>Rdv Interne</option>
                                        <option>Rdv Client</option>
                                        <option>Autre</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Salle
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        onChange={(e) => setRoom(e.target.value)}
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option>Salle de r??union</option>
                                        <option>Salle de repos</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="">
                    <div className="flex items-center justify-between mt-6  sm:gap-4 sm:items-start ">
                        <h2 className="flex-auto font-semibold text-gray-900">January 2022</h2>
                        <div className=" flex justify-end pr-12">
                            <button
                                type="button"
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Previous month</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            <button
                                type="button"
                                className="-my-1.5 -mr-1.5  flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Next month</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-10 px-4 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                        <div>S</div>
                    </div>
                    <div className="mt-2 px-4 grid grid-cols-7 text-sm ">
                        {days.map((day, dayIdx) => (
                            <DateItem day={day} dayIdx={dayIdx} onChange={handleHour} />
                        ))}
                    </div>
                </div>
                <div className="pt-5">
                    <div className="flex justify-end">
                        <Link href="/">
                            <button
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </button>
                        </Link>
                            <button
                                onClick={(e) => {addMeeting(e)}}
                                type="submit"
                                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Save
                            </button>
                    </div>
                </div>
            </form>
            }
            </div>
        </div>
            <div className="w-2/4 m-8">
                <div className="max-w-3xl mx-auto">{<div>
                <section className="mt-12">
                    <h2 className="font-semibold text-gray-900">
                        Schedule for <time dateTime="2022-01-21">January 21, 2022</time>
                    </h2>
                    <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500" >
                        {meetings?.map((meeting) => (
                          <MeetingCard meeting={meeting} />

                        ))}
                    </ol>
                </section>
            </div>}</div>
        </div>
        </main>
    )
}
