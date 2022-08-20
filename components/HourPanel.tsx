/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import {Dialog, Menu, Transition} from '@headlessui/react'
import { ExclamationIcon, XIcon } from '@heroicons/react/outline'

export default function HourPanel() {

    return (
        <div className="absolute top-1/2 rounded bg-white shadow-xl radius p-4 w-1/6 ">
            <div className="flex justify-between items-center">
                <label htmlFor="appt">Début</label>
                <input className="p-1 m-1" type="time" id="startTime" name="startTime"
                       min="06:00" max="23:00" required
                />
            </div>
            <div className="flex justify-between">
                <label htmlFor="appt">Fin</label>
                <input className="p-1 m-1" type="time" id="endTime" name="endTime"
                       min="06:00" max="23:00" required
                />
            </div>

        </div>
    )
}
