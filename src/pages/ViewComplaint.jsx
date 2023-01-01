import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Complaints from "../components/Complaints";
import CTA from "../components/CTA";
import { GetComplaint } from "../requests/complaints";
const GetPriorityColor = (priority) => {
  let array = [
    { bg: "rgb(255, 48, 79,0.4)", fg: "rgb(255, 48, 79,1)" },
    { bg: "rgba(250, 207, 90,0.4)", fg: "rgba(250, 207, 90,1)" },
    { bg: "rgba(44, 185, 120,0.3)", fg: "rgba(44, 185, 120,1)" },
  ];
  return array[priority - 1];
};
const ViewComplaint = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["complaint", id], GetComplaint);
  return (
    <div className="view">
      <div className="main-content container-width my-6 lg:my-12">
        {isLoading && (
          <div className="loader flex mt-6 justify-center items-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-12 w-12 text-indigo"
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
          </div>
        )}
        {!isLoading && (
          <div className="overflow-hidden bg-white shadow sm:rounded-lg ">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Complaint Information
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">ID</dt>
                  <dd className="mt-1 font-semibold text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {data.data.data.id}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Priority
                  </dt>
                  <dd className="mt-1 font-semibold text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <span
                      className="px-3 rounded-lg font-bold py-2"
                      style={{
                        backgroundColor: GetPriorityColor(
                          data.data.data.priority
                        ).bg,
                        color: GetPriorityColor(data.data.data.priority).fg,
                      }}
                    >
                      {parseInt(data.data.data.priority) === 1 ? "High" : ""}
                      {parseInt(data.data.data.priority) === 2 ? "Medium" : ""}
                      {parseInt(data.data.data.priority) === 3 ? "Low" : ""}
                    </span>
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {data.data.data.name}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {data.data.data.email}
                  </dd>
                </div>

                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">From</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {data.data.data.from}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Department
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {data.data.data.department}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">About</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {data.data.data.complain}
                  </dd>
                </div>
                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date Added
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {new Date(data.data.data.date_added).toLocaleString()}
                  </dd>
                </div>

                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Status</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    {data.data.data.date_resolved === "" ? (
                      <strong className="text-red-500">Pending</strong>
                    ) : (
                      <strong className="text-green-500">Resolved</strong>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewComplaint;
