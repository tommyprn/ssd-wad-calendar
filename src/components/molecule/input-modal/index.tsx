import { useState } from "react";
import { NotesProps } from "@/pages";
interface InputModalProps {
  closeModalHandler: () => void;
  onInputChange: (
    value: string,
    key: string
  ) => void;
  notesAmount: number;
  onSubmit: () => void;
}

export const InputModal = ({
  closeModalHandler,
  onInputChange,
  notesAmount,
  onSubmit,
}: InputModalProps) => {
  return (
    <div
      className={`w-screen h-screen z-50 fixed top-0 bg-black/50 items-center justify-center flex`}
    >
      <div className="flex flex-col justify-center items-center bg-white rounded-md p-6 ">
        <div className="flex w-full justify-between mb-4 items-center">
          <p className="font-bold">
            Tambah Acara
          </p>
          <button
            className="font-bold"
            onClick={closeModalHandler}
          >
            X
          </button>
        </div>

        {notesAmount >= 3 ? (
          <p>
            Jumlah catatan tidak boleh melebihi 3,
            silahkan mengatur ulang jadwal anda
          </p>
        ) : (
          <form className="flex flex-col gap-6 min-w-[400px]">
            <input
              placeholder="Kegiatan"
              className="border-b-2"
              type="text"
              onChange={(e) => {
                onInputChange(
                  e.target.value,
                  "title"
                );
              }}
            />
            <input
              placeholder="Jam"
              className="border-b-2"
              type="time"
              onChange={(e) => {
                onInputChange(
                  e.target.value,
                  "time"
                );
              }}
            />
            <input
              placeholder="E-mail pengundang"
              className="border-b-2"
              type="email"
              onChange={(e) => {
                onInputChange(
                  e.target.value,
                  "email"
                );
              }}
            />

            <button
              className="w-fit self-end bg-blue-700 text-white py-2 px-3 rounded font-bold tracking-wider"
              type="button"
              onClick={onSubmit}
            >
              Simpan
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default InputModal;
