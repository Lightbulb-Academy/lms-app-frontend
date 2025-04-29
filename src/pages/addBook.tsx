import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Book } from "./books";

const AddBook = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<Book>();
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = JSON.stringify(Object.fromEntries(formData.entries()));
    const parsedFormValues = JSON.parse(formValues);

    try {
      await axiosInstance(`/books`, {
        method: "POST",
        data: {
          ...parsedFormValues,
          quantity: parseInt(parsedFormValues?.quantity, 10),
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
      console.log(response);
      setBookData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookFromId();
  }, [id]);

  return (
    <div className="w-full p-8">
      <div className="flex items-center mb-2 gap-2">
        <ArrowLeftIcon
          onClick={() => navigate("/books")}
          className="cursor-pointer"
        />
        <h1 className="text-2xl font-bold text-center">Add Books</h1>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          name="title"
          type="text"
          id="title"
          label="Title"
          required={true}
          value={bookData?.title}
        />
        <Input
          name="author"
          type="text"
          id="author"
          label="Author"
          required={true}
          value={bookData?.author}
        />
        <Input
          name="quantity"
          type="number"
          id="quantity"
          label="Quantity"
          value={bookData?.available_copies}
        />
        <div className="flex items-center ">
          <label
            htmlFor="availability"
            className=" text-gray-700 text-sm font-bold "
          >
            Availability:
          </label>
          <input
            type="checkbox"
            id="availability"
            name="availability"
            className="mx-3 size-5"
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-lg text-center">{errorMessage}</p>
        )}
        <Button label="Add Book" type="submit" />
      </form>
    </div>
  );
};

export default AddBook;
