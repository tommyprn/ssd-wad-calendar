import { NotesProps } from "@/pages";
import { MouseEventHandler } from "react";

interface DayCardProps {
  date: Date;
  month: number;
  notes: NotesProps[];
  number: number;
  toggleModal: () => void;
  isCurrentMonth: boolean;
}

export const DayCard = ({
  date,
  month,
  notes,
  number,
  toggleModal,
  isCurrentMonth,
}: DayCardProps) => {
  return (
    <div
      className={`border border-black min-h-[100px] h-full p-2`}
      onClick={
        isCurrentMonth
          ? toggleModal
          : (null as unknown as MouseEventHandler)
      }
    >
      {isCurrentMonth ? (
        <>
          <p className="font-bold text-sm">
            {number}
          </p>

          <div className="flex flex-col gap-2 truncate">
            {notes.map((item, i) => {
              return (
                <div
                  key={i}
                  className="p-2 rounded-md "
                  style={{
                    backgroundColor: `#${Math.random()
                      .toString(16)
                      .substr(-6)}`,
                  }}
                >
                  <p className="text-xs font-bold drop-shadow-md text-white">
                    {item.title}
                  </p>
                  <p className="text-xs font-bold drop-shadow-md text-white">
                    {item.time}
                  </p>
                  <p className="text-xs font-bold drop-shadow-md text-white">
                    {item.email}
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DayCard;
