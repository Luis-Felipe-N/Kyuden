import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from "react-icons/io"

import style from './style.module.scss'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { Button } from '../Button';
import { updateUserData } from '../../service/firebase';
import { useAuth } from '../../hooks/useAuth';
import { removeEmptyAttribute } from '../../utils/Object';

const editProfileFormSchema = yup.object().shape({
    displayName: yup.string(),
    avatar: yup.string(),
    banner: yup.string()
});
  

export function ModalEditProfile() {
    const { register, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(editProfileFormSchema)
    });

    const { user } = useAuth()

    const onSubmit = (data: any) => handleUpdateProfile(data)
    
    function handleUpdateProfile(data: any) {
        console.log(errors)
        console.log(data)
        if (user) {
            console.log(user)
            updateUserData(user.uid, removeEmptyAttribute(data))
        }
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
            <button className="Button violet">Edit profile</button>
            </Dialog.Trigger>
            <Dialog.Portal className={style.modal}>
                <Dialog.Overlay className={style.modal__overlay} />
                <Dialog.Content className={style.modal__content}>
                    <Dialog.Title className={style.modal__content_title}>Editar perfil</Dialog.Title>
                    <Dialog.Description className={style.modal__content_description}>
                        Faça alterações no seu perfil aqui. Clique em salvar quando terminar..
                    </Dialog.Description>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className={style.modal__content_fieldset}>
                            <label className="Label" htmlFor="avatar">
                                Avatar
                            </label>
                            {/* <div className={style.modal__content_preview}>
                            </div> */}
                            <input {...register("avatar")} id="avatar" defaultValue={user?.avatar || ''} />
                        </fieldset>
                        <fieldset className={style.modal__content_fieldset}>
                            <label className="Label" htmlFor="banner">
                                Banner
                            </label>
                            {/* <div className={style.modal__content_preview}>
                                Arraste
                            </div> */}
                            <input {...register("banner")} id="banner" defaultValue={user?.banner || ''} />
                        </fieldset>
                        <fieldset className={style.modal__content_fieldset}>
                            <label className="Label" htmlFor="displayName">
                                Nome
                            </label>
                            <input {...register("displayName")} className="Input" id="displayName" defaultValue={user?.displayName} />
                        </fieldset>

                        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                            <Button type="submit" className="Button green">Salvar</Button>
                        </div>
                    </form>
                    <Dialog.Close asChild>
                    <button className="IconButton" aria-label="Close">
                        <IoMdClose />
                    </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

}
