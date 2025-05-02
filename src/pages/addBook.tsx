import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { FormBook } from "./books";

const AddBook = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<FormBook>();
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);
    const url = id ? `/books/${id}` : "/books";

    try {
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: {
          ...parsedFormValues,
          available_copies: parseInt(parsedFormValues?.available_copies, 10),
          availability: parsedFormValues?.availability === "on",
        },
      });

      toast.success("Book Added Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      navigate("/books");
    } catch (err: any) {
      setErrorMessage(
        err.response?.data?.message || "Failed, Please try again"
      );
      toast.error("Failed, Please try again", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const fetchBookFromId = async () => {
    try {
      const response = await axiosInstance(`/books/${id}`);
      setBookData({ ...response.data, availability: true });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookFromId();
  }, [id]);

  const handleBookDataChange = (e: any) => {
    const { name, value, checked } = e.target;

    setBookData((prevData) => ({
      ...prevData,
      [name]: name === "availability" ? checked : value,
    }));
    console.log(bookData);
  };

  return (
    <div className="flex flex-col w-full p-8 items-center">
      <div className="w-full flex items-center justify-start mb-2 gap-2">
        <ArrowLeftIcon
          onClick={() => navigate("/books")}
          className="cursor-pointer text-gray-400"
        />
        <h1 className="text-sm text-gray-400 text-center">Back to Books</h1>
      </div>
      <div className="flex flex-col w-[600px] shadow-lg p-8 gap-8 mt-8 pb-16 bg-white">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-black">Add New Book</h1>
          <p className="text-sm text-gray-400">
            Enter the details of the book you want to add to your collection.
          </p>
        </div>
        <form className="space-y-8 w-full" onSubmit={handleSubmit}>
          <Input
            name="title"
            type="text"
            id="title"
            label="Title"
            value={bookData?.title}
            onChange={handleBookDataChange}
          />
          <Input
            name="author"
            type="text"
            id="author"
            label="Author"
            value={bookData?.author}
            onChange={handleBookDataChange}
          />
          <Input
            name="available_copies"
            type="number"
            id="quantity"
            label="Quantity"
            value={bookData?.available_copies}
            onChange={handleBookDataChange}
          />
          <div className="flex items-center ">
            <label
              htmlFor="availability"
              className=" text-gray-700 text-lg font-bold "
            >
              Availability:
            </label>
            <input
              type="checkbox"
              id="availability"
              name="availability"
              className="mx-3 size-5"
              onChange={handleBookDataChange}
              checked={bookData?.availability}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-lg text-center">{errorMessage}</p>
          )}
          <Button label={id ? "Update Book" : "Add Book"} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default AddBook;
