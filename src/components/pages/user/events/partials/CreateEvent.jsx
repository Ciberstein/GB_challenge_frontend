import React from 'react'
import { Button } from '../../../../elements/user/Button'
import Modal from '../../../../elements/user/Modal'
import { Input } from '../../../../elements/user/Input'
import { Textarea } from '../../../../elements/user/Textarea'
import { setLoad } from '../../../../../store/slices/loader.slice'
import api from '../../../../../api/axios'
import { eventsThunk } from '../../../../../store/slices/events.slice'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

export const CreateEvent = ({ open, setOpen }) => {

  const { register, handleSubmit, reset, formState: { errors }} = useForm();
  const dispatch = useDispatch();

  const submit = async (data) => {
    dispatch(setLoad(false));
    const url = `/api/v1/events/`;

    await api.post(url, data)
      .then((res) => {
        dispatch(eventsThunk(true));
        setOpen(false);
        reset()
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

  return (
    <>
      <Button onClick={() => setOpen(true)}>Crear nuevo evento</Button>
      <Modal open={open} setOpen={setOpen} title={"Nuevo evento"}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(submit)}>
          <Input
            id="title"
            name="title"
            type="text"
            label={"Título"}
            placeholder={"Ej. Gran evento"}
            register={{
              function: register,
              errors: {
                function: errors,
                rules: {
                  required: 'El título es requerido',
                  maxLength: {
                    value: 50,
                    message: 'Máximo 50 caracteres',
                  },
                  minLength: {
                    value: 5,
                    message: 'Mínimo 5 caracteres',
                  },
                },
              },
            }}
          />
          <Textarea
            id="description"
            name="description"
            label={"Descripción"}
            placeholder={"Ej. lorem ipsum sit amet"}
            register={{
              function: register,
              errors: {
                function: errors,
                rules: {
                  required: 'La descripción es requerida',
                  maxLength: {
                    value: 300,
                    message: 'Máximo 300 caracteres',
                  },
                },
              },
            }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="expiredAt"
              name="expiredAt"
              type="date"
              label={"Fecha del evento"}
              placeholder={"22/10/2025"}
              register={{
                function: register,
                errors: {
                  function: errors,
                  rules: {
                    required: 'La fecha es requerida',
                  },
                },
              }}
            />
            <Input
              id="capacity"
              name="capacity"
              type="number"
              label={"Capacidad de invitados"}
              placeholder={"Ej. 10"}
              register={{
                function: register,
                errors: {
                  function: errors,
                  rules: {
                    required: 'La capacidad es requerida',

                  },
                },
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button type="submit">
              Crear
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
