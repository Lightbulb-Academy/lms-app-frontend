import { useEffect, useState } from "react";
import Button from "../components/button";
import { useNavigate } from "react-router";
import { PencilIcon, Trash2Icon } from "lucide-react";
import CustomModal from "../components/customModal";
import { useBook } from "../context/booksContext";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addBook } from "../redux/slices/booksSlice";

export interface FormBook {
  id?: number;
  title?: string;
  author?: string;
  quantity?: number;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  quantity: number;
  availability: boolean;
}

export default function Books() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useSelector(
    (state: RootState) => state.books
  );
  const dispatch = useDispatch();
  console.log(data);

  useEffect(() => {
    dispatch(addBook());
  }, [dispatch]);

  return (
    <div className="h-full w-full flex flex-col p-8">
      <div className="flex justify-between w-full mb-4">
        <h1 className="text-lg font-bold">Books</h1>
        <Button
          type="button"
          label="+ Add"
          className="bg-black text-white px-2 text-base cursor-pointer !w-[100px]"
          onClick={() => navigate("/add-book")}
        />
      </div>
      <table className="w-full bg-white">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Is Available?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.quantity}</td>
              <td>{book.availability ? "Yes" : "No"}</td>
              <td>
                <div className="flex gap-4 items-center justify-center">
                  <PencilIcon
                    className="text-blue-400 cursor-pointer"
                    size={16}
                    onClick={() => navigate(`/edit-book/${book.id}`)}
                  />
                  <Trash2Icon
                    className="text-red-400 cursor-pointer"
                    size={16}
                    onClick={() => {
                      // setIsModalOpen(true);
                    }}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
