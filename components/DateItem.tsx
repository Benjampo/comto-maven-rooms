import React, {useState} from 'react';
import HourPanel from "./HourPanel";
import useOutsideClick from "../lib/hooks";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function DateItem({day, dayIdx, onChange}) {
    const [isPanelOpen, setIsPanelOpen] = useState(false)
    const handleClickOutside = () => {
        setIsPanelOpen(false);
    };

    const ref = useOutsideClick(handleClickOutside);

    return (
        <div ref={ref} key={day.date} className={classNames(dayIdx > 6 && 'border-t border-gray-200', 'py-2')}>
            {isPanelOpen && <HourPanel />}
            <button
                type="button"
                onClick={() => {
                    setIsPanelOpen(true)
                }}
                onChange={onChange}
                className={classNames(
                    day.isSelected && 'text-white',
                    !day.isSelected && day.isToday && 'text-indigo-600',
                    !day.isSelected && !day.isToday && day.isCurrentMonth && 'text-gray-900',
                    !day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-gray-400',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                    !day.isSelected && 'hover:bg-gray-200',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                )}
            >
                <time dateTime={day.date}>{day.date.split('-').pop().replace(/^0/, '')}</time>
            </button>
        </div>
    );
}

export default DateItem;
