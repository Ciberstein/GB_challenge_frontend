import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reservesThunk } from '../../../../store/slices/reserves.slice';
import { Table } from '../../../elements/user/Table';
import Modal from '../../../elements/user/Modal';
import { Button } from '../../../elements/user/Button';
import { useForm } from 'react-hook-form';
import api from '../../../../api/axios';
import Swal from 'sweetalert2';
import { setLoad } from '../../../../store/slices/loader.slice';
import appError from '../../../../utils/appError';

export const ReservesPage = () => {

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const reserves = useSelector(state => state.reserves);
  const { handleSubmit } = useForm();

  useEffect(() => {
    dispatch(reservesThunk())
  }, []);

  const deleteConfirm = () => {
    Swal.fire({
      title: "Confirmar",
      text: "¿Está seguro que desea cancelar esta reservación?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cancelar"
    }).then((result) => {
      if (result.isConfirmed)
        submit()
    });
  };

  const submit = async () => {
    dispatch(setLoad(false));
    const url = `/api/v1/events/reserve/${selected?.id}`;

    await api.delete(url)
      .then((res) => {
        dispatch(reservesThunk());
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
  };

  const header = [
    {
      field: 'id',
      name: 'ID',
      hidden: true
    },
    {
      field: 'title',
      name: 'Evento',
      wordWrap: 35,
    },
    {
      field: 'description',
      name: 'Descripción',
      wordWrap: 35,
    },
    {
      field: 'expiredAt',
      name: 'Fecha del evento',
      date: true
    },
  ];

  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        <div className="flex flex-col gap-4 text-center">
          <h1 className="text-xl font-medium">{selected?.title}</h1>
          <img src={`https://picsum.photos/id/${selected?.id}/600/400`} className="rounded-lg" />
          <p>{selected?.description}</p>
          <form onSubmit={handleSubmit(deleteConfirm)}>
            <Button color="red" type="submit" className="w-full">
              Cancelar reserva
            </Button>
          </form>
        </div>
      </Modal>
      <Table
        title="Mis reservaciones"
        header={header}
        items={reserves}
        selectRow={{
          active: true,
          selected: selected,
          setSelected: (tr) => {
            setOpen(true)
            setSelected(tr)
          },
        }}
      />
    </div>
  )
}
