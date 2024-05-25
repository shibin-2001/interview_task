import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  students: [],
  courses: [],


};

export const StudentSlice = createSlice({
  name: "Student",
  initialState,
  reducers: {
  
    setStudents: (state, action) => {
    
      state.students = action.payload;
     
    },
   
    setCourses:(state,action)=>{
      state.courses = action.payload;
    },
   
  },
});

export const { setStudents,setCourses} =
  StudentSlice.actions;

export default StudentSlice.reducer;
