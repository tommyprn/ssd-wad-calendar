import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import {
  DayCard,
  InputModal,
} from "../components";

const inter = Inter({ subsets: ["latin"] });

export interface NotesProps {
  title: string;
  email: string;
  time: string;
}

interface AllNotes {
  number: number;
  notes: NotesProps[];
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] =
    useState<boolean>(false);
  const [dateSelected, setDateSelected] =
    useState<number>(0);
  const [
    selectedNotesAmount,
    setSelectedNotesAmount,
  ] = useState<number>(0);
  const [notes, setNotes] = useState<AllNotes[]>(
    []
  );
  const [form, setForm] = useState<NotesProps>({
    title: "",
    time: "",
    email: "",
  });

  useEffect(() => {
    const storage = localStorage.getItem("notes");
    const parsedData = JSON.parse(
      storage ? storage : ""
    );

    setNotes(parsedData as unknown as AllNotes[]);
  }, []);

  const today = new Date();
  const days = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  );

  const dayOfFirstDate = firstDayOfMonth.getDay();

  let calendarData = [];

  for (let day = 0; day < 35; day++) {
    if (day === 0 && dayOfFirstDate === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() - 7
      );
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() +
          (day - dayOfFirstDate)
      );
    } else {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + 1
      );
    }

    let calendarDay = {
      currentMonth:
        firstDayOfMonth.getMonth() ===
        today.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
    };

    calendarData.push(calendarDay);
  }

  // open modal function
  const openModalHandler = (
    number: number,
    notesAmount: number
  ) => {
    setIsModalOpen(true);
    setDateSelected(number);
    setSelectedNotesAmount(notesAmount);
  };

  // close modal function
  const closeModalHandler = () => {
    setIsModalOpen(false);
    setDateSelected(0);
    setSelectedNotesAmount(0);
  };

  // on input change handler
  const onInputChange = (
    value: string,
    key: string
  ) => {
    setForm((prevState) => {
      const newState = { ...prevState };

      newState[key as keyof NotesProps] = value;
      return newState;
    });
  };

  // on submit form handler
  const onSubmit = () => {
    let newData = [...notes];
    const isExist = notes?.some(
      (item) => item.number === dateSelected
    );

    if (isExist) {
      const dataIndex = notes.findIndex(
        (item) => item.number === dateSelected
      );

      const dataToSend = [
        ...notes[dataIndex].notes,
        form,
      ];

      newData[dataIndex] = {
        number: dateSelected,
        notes: dataToSend,
      };
    } else {
      newData.push({
        number: dateSelected,
        notes: [form],
      });
    }

    setNotes(newData as AllNotes[]);

    localStorage.setItem(
      "notes",
      JSON.stringify(newData)
    );

    setIsModalOpen(false);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center pt-6 px-24 ${inter.className}`}
    >
      <p className="font-bold text-3xl mb-6">
        {months[today.getMonth()]}{" "}
        {today.getFullYear()}
      </p>

      <div className="w-full grid grid-cols-7 bg-black rounded-t-md">
        {days.map((item, i) => {
          return (
            <div
              key={i}
              className={`font-bold text-sm col-start-${i} text-white text-center py-2`}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div className="w-full grid grid-cols-7 grid-rows-5 border border-black rounded-b-md">
        {calendarData.map((item, i) => {
          const dataIndex = notes.findIndex(
            (data) => data.number === item.number
          );

          return (
            <div
              key={i}
              className="cursor-pointer"
            >
              <DayCard
                date={item.date}
                month={item.month}
                notes={
                  dataIndex >= 0
                    ? notes[dataIndex]?.notes
                    : []
                }
                number={item.number}
                isCurrentMonth={item.currentMonth}
                toggleModal={() =>
                  openModalHandler(
                    item.number,
                    notes[dataIndex]?.notes.length
                  )
                }
              />
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <InputModal
          closeModalHandler={closeModalHandler}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          notesAmount={selectedNotesAmount}
        />
      )}
    </main>
  );
}
