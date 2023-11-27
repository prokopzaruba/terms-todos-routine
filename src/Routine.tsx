import { useState } from "react";
import useFetch from "./useFetch";
import RoutineForm from "./RoutineForm";
import { useMutation } from "@tanstack/react-query";
import Axios from "axios";
import ActivityComponent from "./Activity";

interface Activity {
  activity: string;
  description: string;
  start: string;
  end: string;
  order: number;
  id: number;
}

const Routine = () => {
  const url = "http://localhost:8000/routine";

  const { data: routineActivities, refetch } = useFetch(url, "routine");
  const deleteRequest = useMutation((id: number) => {
    return Axios.delete(`${url}/${id}`);
  });

  const deleteActivity = (id: number) => {
    deleteRequest.mutate(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };
  const [openedForm, setOpenedForm] = useState(-1);
  let order = 0;
  return (
    <div className="routine">
      {routineActivities
        ?.slice()
        .sort((a: Activity, b: Activity) => a.order - b.order)
        .map((activity: Activity, i: number) => {
          const currOrder = (activity.order + order) / 2;
          order = activity.order;
          return (
            <div key={activity.id}>
              <RoutineForm
                openedForm={openedForm}
                onOpen={setOpenedForm}
                id={activity.id}
                order={currOrder}
                refetch={refetch}
              />
              <ActivityComponent
                activity={activity}
                deleteActivity={deleteActivity}
              />
              {i === routineActivities.length - 1 ? (
                <RoutineForm
                  openedForm={openedForm}
                  onOpen={setOpenedForm}
                  id={1.1}
                  order={activity.order + 10000}
                  refetch={refetch}
                />
              ) : (
                ""
              )}
            </div>
          );
        })}

      {routineActivities?.length === 0 ? (
        <RoutineForm
          openedForm={openedForm}
          onOpen={setOpenedForm}
          id={1.2}
          order={10000}
          refetch={refetch}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Routine;
