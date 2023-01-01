import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { GetComplaints } from "../requests/complaints";
import { Link } from "react-router-dom";

const GetPriorityColor = (priority) => {
  let array = [
    { bg: "rgb(255, 48, 79,0.4)", fg: "rgb(255, 48, 79,1)" },
    { bg: "rgba(250, 207, 90,0.4)", fg: "rgba(250, 207, 90,1)" },
    { bg: "rgba(44, 185, 120,0.3)", fg: "rgba(44, 185, 120,1)" },
  ];
  return array[priority - 1];
};
export default function Complaints() {
  const [filter, setFilter] = React.useState("");
  const { data, isLoading } = useQuery(["complaints"], GetComplaints);
  //const data_complaints = data?.data.data;
  const data_complaints = data?.data?.data
    ? data.data.data.filter((complaint) => complaint.id.includes(filter))
    : data?.data?.data;

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem("logged_in")) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-3 pl-2 w-full">
          <div className="relative ">
            <label htmlFor="hs-table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              className="block border w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 w-full"
              placeholder="Search..."
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="p-1.5 w-full inline-block align-middle">
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
            <div className="overflow-auto border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="flex items-center px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      <span className="inline-flex items-center">Name</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      <span className="inline-flex items-center">Email</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      <span className="inline-flex items-center">
                        Department
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      <span className="inline-flex items-center">Priority</span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      <span className="inline-flex items-center">
                        Date Added
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      <span className="inline-flex items-center">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data_complaints?.map((complaint, index) => {
                    return (
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                          {complaint.id}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {complaint.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {complaint.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {complaint.department}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          <span
                            className="px-3 rounded-lg font-bold py-2"
                            style={{
                              backgroundColor: GetPriorityColor(
                                complaint.priority
                              ).bg,
                              color: GetPriorityColor(complaint.priority).fg,
                            }}
                          >
                            {complaint.priority == 1 ? "High" : ""}
                            {complaint.priority == 2 ? "Medium" : ""}
                            {complaint.priority == 3 ? "Low" : ""}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                          {new Date(complaint.date_added).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium  whitespace-nowrap">
                          <Link
                            className="text-green-500 hover:text-green-700"
                            to={`/view-complaint/${complaint.id}`}
                          >
                            View
                          </Link>
                          {isLoggedIn && (
                            <Link
                              className="ml-3 text-indigo-500 hover:text-indigo-700"
                              to={`/edit-complaint/${complaint.id}`}
                            >
                              Edit
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
