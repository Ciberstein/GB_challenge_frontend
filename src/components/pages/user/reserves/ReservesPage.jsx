import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { reservesThunk } from '../../../../store/slices/reserves.slice';
import { Table } from '../../../elements/user/Table';
import Modal from '../../../elements/user/Modal';
import { Button } from '../../../elements/user/Button';
import { useForm } from 'react-hook-form';

export const ReservesPage = () => {

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const reserves = useSelector(state => state.reserves);
  const { handleSubmit } = useForm();

  useEffect(() => {
    dispatch(reservesThunk())
  }, []);

  const submit = async () => {

  }

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
          <form onSubmit={handleSubmit(submit)}>
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
