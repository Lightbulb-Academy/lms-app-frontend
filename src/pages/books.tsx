import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInterceptor";

interface Book {
  id: number;
  title: string;
  author: string;
  // TODO: update interface for remaining fields
}

export default function Books() {
  const [data, setData] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const response = await axiosInstance("/books");
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []); // runs fetchBooks() once on page load

  return (
    <div className="h-full w-full flex flex-col p-8">
      <h1 className="text-lg font-bold">Books</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            {/* TODO: add remaining header for Books */}
          </tr>
        </thead>
        <tbody>
          {data.map((book) => (
            <tr key={book.id}>
              <td>{book?.title}</td>
              <td>{book?.author}</td>
              {/* TODO: add remaining data fields for Books */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
