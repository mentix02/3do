import { Routes, Route } from "react-router-dom";

import BaseLayout from "./BaseLayout";
import TaskList from "../views/TaskList";
import NotFound from "../views/NotFound";
import TaskCreate from "../views/TaskCreate";

const BaseRouter = () => (
  <Routes>
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<TaskList />} />
      <Route path="/new" element={<TaskCreate />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default BaseRouter;
