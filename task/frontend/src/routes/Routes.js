import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";


import LoginPage from "../modules/Auth/LoginPage";

import RegistrationPage from "../modules/Auth/RegistrationPage";
import PrivateRoute from "./PrivateRoute";
import { Spin } from "antd";
import MasterLayout from "../modules/student_management/Layout";
import AddCourse from "../modules/student_management/AddCourse";
import AddStudent from "../modules/student_management/AddStudent";
import ViewCourses from "../modules/student_management/ViewCourses";
import ViewStudents from "../modules/student_management/ViewStudents";
import HomePage from "../modules/student_management/HomePage";
import NotFound from "../modules/NotFound";

const AllRoutes = ({ theme, setTheme }) => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Suspense fallback={<div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}><Spin /></div>}>
              <MasterLayout />
            </Suspense>
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="/add_course" element={<AddCourse />} />
        <Route path="/add_student" element={<AddStudent />} />
        <Route path="/view_courses" element={<ViewCourses />} />
        <Route path="/view_students" element={<ViewStudents />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
