import React, { useEffect, useState } from 'react'
import { Table } from '../../../elements/user/Table';
import { useDispatch, useSelector } from 'react-redux';
import { eventsThunk } from '../../../../store/slices/events.slice';
import { CreateEvent } from './partials/CreateEvent';
import { EditEvent } from './partials/EditEvent';
import { DeleteEvent } from './partials/DeleteEvent';

export const Element = ({ data, setData }) => {

  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <div className="flex justify-start border-b dark:border-zinc-800 pb-6 font-normal gap-4">
      <CreateEvent open={createModal} setOpen={setCreateModal} />
      <EditEvent open={editModal} setOpen={setEditModal} data={data} setData={setData} />
      <DeleteEvent open={deleteModal} setOpen={setDeleteModal} data={data} setData={setData} />
    </div>
  )
}

export const EventsPage = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const events = useSelector(state => state.events);
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
      field: 'capacity',
      name: 'Capacidad',
    },
    {
      field: 'status',
      name: 'Estátus',
    },
    {
      field: 'expiredAt',
      name: 'Fecha del evento',
      date: true
    },
  ];

  useEffect(() => {
    dispatch(eventsThunk(true))
  }, []);

  return (
    <div>
      <Table
        element={<Element data={selected} setData={setSelected} />}
        title="Mis eventos"
        header={header}
        items={events}
        selectRow={{
          active: true,
          selected: selected,
          setSelected: setSelected,
        }}
      />
    </div>
  )
}
