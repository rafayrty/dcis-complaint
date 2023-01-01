import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { StoreComplaint } from "../requests/complaints";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddComplaintSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This Field is Required"),
  email: Yup.string().email("Invalid email").required("This Field is Required"),
  complain: Yup.string()
    .min(30, "Should be greater than 30 Characters")
    .max(500, "Too Long!")
    .required("This Field is Required"),
  from: Yup.string().required("This Field is Required"),
  department: Yup.string().required("This Field is Required"),
});
const AddComplaint = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(StoreComplaint, {
    onSuccess() {
      toast.success("Complaint Added Successfully");

      queryClient.invalidateQueries({ queryKey: ["complaints"] });
      navigate(-1);
    },
  });

  return (
    <div className="add-complaint mb-12">
      <div className="main-content mt-12 container-width">
        <div>
          <h1 className="ml-3 lg:ml-0 text-indigo-600 font-bold text-3xl">
            Add a New Complaint
          </h1>
          <div className="mt-6 lg:mt-8 md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Complaint Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Describe the problem that you have been facing
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  department: "DCIS",
                  from: "B.S Student",
                  complain: "",
                }}
                validationSchema={AddComplaintSchema}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    mutation.mutate(values);
                  }, 400);
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form>
                    <div className="overflow-auto shadow sm:rounded-md">
                      <div className="bg-white px-4 py-5 sm:p-6">
                        <div className="grid grid-cols-6 gap-6">
                          <div className="col-span-12 sm:col-span-12">
                            <label
                              htmlFor="full-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Full name*
                            </label>

                            <Field
                              type="text"
                              id="full-name"
                              name="name"
                              className={`mt-1 block w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                errors.name && touched.name
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name="name"
                              className="text-sm mt-1 text-red-500 font-bold"
                              component="div"
                            />
                          </div>

                          <div className="col-span-12">
                            <label
                              htmlFor="last-name"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email*
                            </label>
                            <Field
                              type="email"
                              id="email"
                              name="email"
                              className={`mt-1 block w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                errors.email && touched.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <ErrorMessage
                              name="email"
                              className="text-sm mt-1 text-red-500 font-bold"
                              component="div"
                            />
                          </div>

                          <div className="col-span-12">
                            <label
                              htmlFor="from"
                              className="block text-sm font-medium text-gray-700"
                            >
                              From*
                            </label>
                            <Field
                              as="select"
                              id="from"
                              name="from"
                              className={`mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                                errors.from && touched.from
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <option selected>B.S Student</option>
                              <option>M.S Student</option>
                              <option>P.H.D Student</option>
                              <option>Faculty</option>
                            </Field>
                            <ErrorMessage
                              name="department"
                              className="text-sm mt-1 text-red-500 font-bold"
                              component="div"
                            />
                          </div>
                          <div className="col-span-12">
                            <label
                              htmlFor="department"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Department*
                            </label>
                            <Field
                              as="select"
                              id="department"
                              name="department"
                              autoComplete="department-name"
                              className={`mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm ${
                                errors.department && touched.department
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <option selected>DCIS</option>
                              <option>DEE</option>
                              <option>DMME</option>
                              <option>DCHE</option>
                              <option>DPAM</option>
                              <option>DNE</option>
                              <option>DCIS</option>
                            </Field>
                            <ErrorMessage
                              name="department"
                              className="text-sm mt-1 text-red-500 font-bold"
                              component="div"
                            />
                          </div>
                          <div className="col-span-12">
                            <label
                              htmlFor="department"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Describe Your Complain*
                              <Field
                                as="textarea"
                                type="text"
                                name="complain"
                                id="complain"
                                placeholder="My Internet is not working..."
                                rows="5"
                                className={`mt-1 block w-full rounded-md  shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                  errors.complain && touched.complain
                                    ? "border-red-500"
                                    : "border-gray-300"
                                }`}
                              />
                              <ErrorMessage
                                name="complain"
                                className="text-sm mt-1 text-red-500 font-bold"
                                component="div"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                        <button
                          type="submit"
                          disabled={mutation.isLoading}
                          className="inline-flex disabled:opacity-75 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                          Save
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComplaint;
