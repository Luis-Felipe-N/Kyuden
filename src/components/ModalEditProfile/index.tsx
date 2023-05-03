import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from "react-icons/io"

import "swiper/css";
import "swiper/css/navigation";

import style from './style.module.scss'

import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { updateUserData } from '../../service/firebase';

import { useAuth } from '../../hooks/useAuth';
import { Button } from '../Button';
import { AvatarSlider } from './AvatarSlider';
import { BannerSlider } from './BannnerSlider';

import { removeEmptyAttribute } from '../../utils/Object';

const editProfileFormSchema = yup.object().shape({
    displayName: yup.string(),
    avatar: yup.string(),
    banner: yup.string()
});

export function ModalEditProfile() {
    const [open, setOpen] = useState(false);
    
    const { user } = useAuth()

    console.log("renderizando modal")

    const { register, handleSubmit, formState:{ errors }, setValue } = useForm({
        resolver: yupResolver(editProfileFormSchema)
    });

    function handleSelectAvatar(url: string) {
        setValue("avatar", url)
    }

    function handleSelectBanner(url: string) {
        setValue("banner", url)
    }

    const onSubmit = (data: any) => handleUpdateProfile(data)
    
    function handleUpdateProfile(data: any) {
        if (user) {
            updateUserData(user.uid, removeEmptyAttribute(data)).then(() => {
                setOpen(false)
            })
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
            <button className="Button violet">Editar perfil</button>
            </Dialog.Trigger>
            <Dialog.Portal className={style.modal}>
                <Dialog.Overlay className={style.modal__overlay} />
                <Dialog.Content className={style.modal__content}>
                    <div className={style.modal__content_header}>
                        <div>
                            <Dialog.Title className={style.modal__content_title}>Editar perfil</Dialog.Title>
                            <Dialog.Description className={style.modal__content_description}>
                                Faça alterações no seu perfil aqui. Clique em salvar quando terminar..
                            </Dialog.Description>
                        </div>
                        <Dialog.Close asChild>
                        <button className="IconButton" aria-label="Close">
                            <IoMdClose size={25} />
                        </button>
                        </Dialog.Close>
                    </div>

                    <div className={style.modal__content_form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <fieldset className={style.modal__content_fieldset}>
                                <label className="Label" htmlFor="displayName">
                                    Nome
                                </label>
                                <input {...register("displayName")} className="Input" id="displayName" defaultValue={user?.displayName} />
                            </fieldset>

                            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                <Button type="submit" className={style.modal__btnsave}>Salvar</Button>
                            </div>
                        </form>
                        <div className={style.modal__suggestion}>
                            <strong>Avatares</strong>
                            <div className={style.modal__suggestion_avatar}>
                                <AvatarSlider onSelectAvatar={handleSelectAvatar} />                                
                            </div>

                            <strong>Banners</strong>
                            <div className={style.modal__suggestion_banner}>
                                <BannerSlider onSelectBanner={handleSelectBanner} />
                            </div>
                        </div>
                       
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )

}
