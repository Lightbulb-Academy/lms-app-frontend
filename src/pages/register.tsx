import { FormEvent } from "react";
import Button from "../components/button";
import Input from "../components/input";
import { useNavigate } from "react-router";
import { axiosInstance } from "../utils/axiosInterceptor";
import { object, string } from "yup";

let registerSchema = object({
  name: string().required(),
  email: string().email().required(),
  mobile: string().required(),
  password: string().required("Password is required!"),
});

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const values = await registerSchema.validate(formValues);
      const response = await axiosInstance("/auth/register", {
        method: "POST",
        data: values,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // test@gmaill.com - test123

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input name="name" type="text" id="name" label="Name" />
          <Input name="email" type="string" id="email" label="Email" />
          <Input name="mobile" type="tel" id="Mobile" label="Mobile" />
          <Input
            name="password"
            type="password"
            id="password"
            label="Password"
          />
          <Button label="Register" type="submit" className="bg-blue-600" />
        </form>
      </div>
    </div>
  );
};

export default Register;
