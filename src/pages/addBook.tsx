import { FormEvent, useEffect, useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { axiosInstance } from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { LucideArrowLeft } from "lucide-react";
import { FormBook } from "./books";
import { useBook } from "../context/booksContext";
import { number, object, string } from "yup";

const bookSchema = object({
  title: string().required(),
  author: string().required(),
  quantity: number().required().min(1),
});

const AddBook = () => {
  const navigate = useNavigate();
  const [bookData, setBookData] = useState<FormBook>();
  const [errorMessage, setErrorMessage] = useState("");
  const { updateBook } = useBook();

  const { id } = useParams();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = id ? `/books/${id}` : "/books";
    console.log(bookData);

    try {
      const values = await bookSchema.validate(bookData);
      await axiosInstance(url, {
        method: id ? "PATCH" : "POST",
        data: { ...values, availability: values.quantity > 0 },
      });

      toast.success("Book Added Successfully");
      updateBook();
      navigate("/books");
    } catch (err: any) {
      console.log(err);
      setErrorMessage(
        err.response?.data?.message || "Failed, Please try again"
      );
      toast.error("Failed, Please try again");
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
  };

  return (
    <div className="flex flex-col w-full p-8 items-center">
      <div className="w-full flex items-center justify-start mb-2 gap-2">
        <LucideArrowLeft
          onClick={() => navigate("/books")}
          className="cursor-pointer text-gray-500"
        />
        <h1 className="text-sm text-gray-500 text-center">Back to Books</h1>
      </div>
      <div className="flex flex-col w-[600px] shadow-lg p-8 gap-8 mt-8 pb-16 bg-white rounded-md">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-black">Add New Book</h1>
          <p className="text-gray-400">
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
            name="quantity"
            type="number"
            id="quantity"
            label="Quantity"
            value={bookData?.quantity}
            onChange={handleBookDataChange}
          />
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
