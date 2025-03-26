import { useDispatch, useSelector } from "react-redux";
import { Events } from "./partials/Events";
import { useEffect } from "react";
import { eventsThunk } from "../../../../store/slices/events.slice";

export const HomePage = () => {

  const events = useSelector(state => state.events);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(eventsThunk())
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="col-span-full">
        <Events events={events} />
      </div>
    </div>
  );
}
