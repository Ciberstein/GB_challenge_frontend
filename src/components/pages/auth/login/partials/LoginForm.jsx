import React, { useState } from 'react'
import { Input } from '../../../../elements/user/Input';
import { useForm } from 'react-hook-form';
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import isEmailValid from '../../../../../utils/isEmailValid';
import { Button } from '../../../../elements/user/Button';
import { useNavigate } from 'react-router-dom';
import { setLoad } from '../../../../../store/slices/loader.slice';
import { useDispatch } from 'react-redux';
import api from '../../../../../api/axios';
import appError from '../../../../../utils/appError';
import Swal from 'sweetalert2';

export const LoginForm = ({ setAccount }) => {

  const [hide, setHide] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }} = useForm();

  const trigger = (res) => {

    if(res.status === 200) {
      location.reload()
    }

    else if(res.status === 201) {
      navigate("/register", { state: { data: res.data } })
    }

    else if(res.status === 202) {
      setAccount(res.data.account)
    }
  }

  const submit = async (data) => {
    dispatch(setLoad(false));
    
    const url = `/api/v1/auth/login`;

    await api.post(url, data)
      .then((res) => trigger(res))
      .catch((err) => {
        appError(err);
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
      .finally(() => dispatch(setLoad(true)));
  };

  return (
    <div className="h-full flex flex-col justify-center">
      <form onSubmit={handleSubmit(submit)} 
        className="grid grid-cols-1 gap-6 max-w-lg sm:mx-auto p-6 rounded-2xl bg-white dark:bg-zinc-900 shadow-lg"
      >
        <div className="grid grid-cols-1 gap-6">
          <Input
            icon={<EnvelopeIcon className="size-6"/>}
            id="email"
            name="email"
            type="email"
            label={"Correo electrónico"}
            placeholder={"username@domain.com"}
            register={{
              function: register,
              errors: {
                function: errors,
                rules: {
                  required: 'El email es requerido',
                  validate: {
                    isEmailValid: (value) => {
                      if (!isEmailValid(value)) {
                        return 'Formato de email inválido';
                      }
                      return true;
                    },
                  },
                },
              },
            }}
          />
          <Input
            icon={<LockClosedIcon className="size-6" />}
            id="password"
            name="password"
            type={hide ? 'password' : 'text'}
            label={"Contraseña"}
            placeholder={"*************"}
            register={{
              function: register,
              errors: {
                function: errors,
                rules: {
                  required: 'La contraseña es requerida',
                  minLength: {
                    value: 8,
                    message: 'Mínimo 8 caracteres',
                  },
                },
              },
            }}
            helperLink={{
              url: '/recovery',
              text: 'Recuperar contraseña'
            }}
            element={
              <button type="button" onClick={() => setHide(!hide)} >
                {hide ? (<EyeIcon className="size-6" /> ) : ( <EyeSlashIcon className="size-6" />)}
              </button>
            }
          />
        </div>
        <Button type="submit" size="lg">
          Ingresar
        </Button>
      </form>
    </div>
  )
}
