import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Error from "../pages/Error";
import JobDetails from "../pages/JobDetails";
import JobApply from "../pages/JobApply";
import PrivateRoutes from "../routes/PrivateRoutes";
import FindJobs from "../pages/FindJobs";
import MyApplications from "../pages/MyApplications";
import AddJobs from "../pages/Admin/AddJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/jobs/:id",
        element: <JobDetails />,
        loader: ({ params }) =>
          fetch(`https://job-portal-umber-chi.vercel.app/jobs/${params.id}`),
      },
      {
        path: "/jobApply/:id",
        element: <PrivateRoutes>
          <JobApply />
        </PrivateRoutes>,
        loader: ({ params }) =>
          fetch(`https://job-portal-umber-chi.vercel.app/jobs/${params.id}`),
      },
      {
        path: "/myApplications",
        element: <PrivateRoutes>
          <MyApplications />
        </PrivateRoutes>,
      },
      {
        path: "/addJob",
        element: <PrivateRoutes>
          <AddJobs />
        </PrivateRoutes>,
      },
      {
        path: "/findJobs",
        element: <FindJobs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

export default router;
