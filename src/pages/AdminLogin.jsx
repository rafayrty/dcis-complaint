import React from "react";
import { useMutation } from "react-query";
import { Login } from "../requests/login";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [pass_code, setPassCode] = React.useState("");
  const mutation = useMutation(Login, {
    onSuccess() {
      toast.success("Login Successfully");
      localStorage.setItem("logged_in", true);
      window.location.href = "/";
    },
    onError() {
      toast.error("Login Failure");
    },
  });
  React.useEffect(() => {
    if (localStorage.getItem("logged_in")) {
      navigate(-1);
    }
  });
  const navigate = useNavigate();
  const submit = (e) => {
    e.preventDefault();
    setPassCode("");

    mutation.mutate({ pass_code });
  };
  return (
    <div className="Home">
      <div className="main-content container-width">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account Admin
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={submit}
            >
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <label htmlFor="password" className="sr-only">
                    Login Code
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassCode(e.target.value)}
                    className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Pass Code"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={mutation.isLoading}
                  className="group disabled:opacity-75 relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {mutation.isLoading && (
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
