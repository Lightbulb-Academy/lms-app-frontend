import Button from "./button";

export default function CustomModal() {
  return (
    <div className="w-screen h-screen bg-[#00000079] flex justify-center items-center absolute inset-0">
      <div className="w-[600px] h-[200px] bg-white rouded p-4 flex flex-col justify-between rounded">
        <div className="text w-full">
          <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">Delete Book</h1>
            <p>
              Are you sure you want to delete this book? This action cannot be
              undone.
            </p>
          </div>
        </div>
        <div className="button w-full flex justify-end items-center gap-4">
          <Button
            className="w-fit px-2 bg-white !text-black border"
            type="button"
            label="Cancel"
          />
          <Button
            className="w-fit px-2 bg-red-500"
            type="button"
            label="Delete"
          />
        </div>
      </div>
    </div>
  );
}
