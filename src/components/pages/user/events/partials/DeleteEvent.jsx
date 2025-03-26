import React from 'react'
import { Button } from '../../../../elements/user/Button'
import Modal from '../../../../elements/user/Modal'
import api from '../../../../../api/axios';
import { eventsThunk } from '../../../../../store/slices/events.slice';
import Swal from 'sweetalert2';
import appError from '../../../../../utils/appError';
import { setLoad } from '../../../../../store/slices/loader.slice';
import { useForm } from 'react-hook-form';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';

export const DeleteEvent = ({ open, setOpen, data, setData }) => {

  const { handleSubmit} = useForm();
  const dispatch = useDispatch();

  const submit = async () => {
    dispatch(setLoad(false));
    const url = `/api/v1/events/${data?.id}`;

    await api.delete(url)
      .then((res) => {
        dispatch(eventsThunk(true));
        setOpen(false);
        setData(null);
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
      .finally(() => dispatch(setLoad(true)))
  };

  if(data)
    return (
      <>
        <Button onClick={() => setOpen(true)} color="red">Eliminar evento</Button>
        <Modal open={open} setOpen={setOpen} header={false}>
          <form className="flex flex-col gap-6 text-center items-center" onSubmit={handleSubmit(submit)}>
            <ExclamationCircleIcon className="size-20" />
            <h1 className="text-xl">¿Está Seguro que desea eliminar el evento?</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <Button type="submit">
                Eliminar
              </Button>
              <Button
                type="button"
                color="red" 
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal>
      </>
    )
}
