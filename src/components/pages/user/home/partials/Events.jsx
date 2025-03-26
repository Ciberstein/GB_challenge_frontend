import React, { useState } from 'react'
import { Card } from '../../../../elements/user/Card'
import { BookmarkSlashIcon, CalendarIcon, UsersIcon } from '@heroicons/react/24/outline';
import convertDate from '../../../../../utils/convertDate';
import Modal from '../../../../elements/user/Modal';
import { Button } from '../../../../elements/user/Button';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setLoad } from '../../../../../store/slices/loader.slice';
import api from '../../../../../api/axios';
import appError from '../../../../../utils/appError';
import Swal from 'sweetalert2';
import { eventsThunk } from '../../../../../store/slices/events.slice';

export const Events = ({ events }) => {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const { handleSubmit } = useForm();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setData(event);
    setOpen(true);
  }

  const submit = async () => {
    dispatch(setLoad(false));
    const url = `/api/v1/events/reserve/${data.id}`;

    await api.post(url)
      .then((res) => {
        dispatch(eventsThunk());
        Swal.fire({
          toast: true,
          position: 'bottom-right',
          icon: 'success',
          text: res.data.message,
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      })
      .catch((err) => {
        appError(err)
        Swal.fire({
          toast: true,
          position: 'bottom-right',
          icon: 'error',
          text: err.response.data.message,
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
        });
      })
      .finally(() => {
        setOpen(false);
        dispatch(setLoad(true));
      })
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="!p-4 dark:text-white">
        <h1 className="text-2xl font-medium flex gap-4 items-center justify-center">
          Todos los eventos disponibles
        </h1>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <Modal open={open} setOpen={setOpen} header={false} screen>
          <div className="grid grid-cols-1 gap-4">
            <Card className="!p-4 dark:text-white">
              <h1 className="text-2xl font-medium flex gap-4 items-center justify-center">
                {data.title}
              </h1>
            </Card>
            <img src={`https://picsum.photos/id/${data.id}/600/400`} className="rounded-lg" />
            <Card className="!p-4 dark:text-white flex flex-col gap-6">
              <p>{data.description}</p>
              <div className="text-center underline font-medium col-span-full dark:text-white sm:text-xl">
                Quedan {data.capacity - data.members?.length} lugares disponibles
              </div>
            </Card>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" onSubmit={handleSubmit(submit)}>
              <Button type="submit" color="green">
                Reservar
              </Button>
              <Button type="button" color="red" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
            </form>
          </div>
        </Modal>

        { events.length > 0 ?
            events.map((event, index) => (
              <Card 
                key={index}
                className="flex flex-col justify-between !p-0 relative overflow-hidden" 
                title={event.title}
                style={{
                  backgroundImage: 'url(img/card-bg-1.svg)'
                }}
              >
                <img src={`https://picsum.photos/id/${event.id}/400/200`} />
                <div className="p-4">
                  <h1 className="text-lg font-medium">
                    {event.title}
                  </h1>
                </div>
                <div className="p-4">
                  <Button 
                    size="md"
                    color="green"
                    className="rounded-full w-full"
                    onClick={() => handleClick(event)}
                  >
                    Reservar
                  </Button>
                </div>
                <div className="flex justify-between w-full absolute">
                  <div className="p-2 bg-green-700 rounded-br-lg 
                    shadow-lg flex gap-2 items-center text-white text-sm"
                  >
                    <CalendarIcon className="size-5" />
                    <span className="font-medium">
                      {convertDate(event.expiredAt, { month: 'short', day: 'numeric'})}
                    </span>
                  </div>
                  <div className="p-2 bg-blue-700 rounded-bl-lg 
                    shadow-lg flex gap-2 items-center text-white text-sm"
                  >
                    <UsersIcon className="size-5" />
                    <span className="font-medium">
                      {`${event.members.length}/${event.capacity}`}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          :
          <div className="flex flex-col gap-6 items-center justify-center col-span-full">
            <BookmarkSlashIcon className="size-20" />
            <h1 className="font-medium sm:text-3xl">
              No hay eventos disponibles por el momento
            </h1>
          </div>
        }
      </div>
    </div>
  )
}
