import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, MouseEvent, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: string;
  id: string;
  name: string;
  required?: boolean;
}

const Input = ({
  label,
  type,
  id,
  name,
  required = true, // assigns default value as true
  value,
  ...rest
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="block text-lg font-bold text-gray-700">
        {label}
      </label>
      <div className="flex items-center justify-between w-full px-2 py-2 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100">
        <input
          value={value}
          type={inputType}
          id={id}
          name={name}
          required={required}
          className={`border-none outline-0 ${
            isPassword ? "w-[90%]" : "w-full"
          }`}
          placeholder={`Enter ${label}`}
          {...rest}
        />
        {isPassword && (
          <button type="button" className="" onClick={handleShowPassword}>
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
