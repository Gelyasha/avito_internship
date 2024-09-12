import React, { FC, useState } from 'react';
import { Button } from 'antd';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { createAdvertisementThunk } from '../../../store/slices/advertisementsSlice';
import AdvertisementModal from '../AdvertisementModal';
import { IFormValues } from '../AdvertisementModal/AdvertisementModal';

const AddAdvertisement: FC = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useAppDispatch();

    const handleSave = async (values: IFormValues) => {
        try {
            //TODO: подумать над лоадингом?
            await dispatch(createAdvertisementThunk(values));
            setIsModalVisible(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <div>
            <Button
                onClick={() => {
                    setIsModalVisible(true)
                }}
            >
                Создать объявление
            </Button>
            <AdvertisementModal
                isModalVisible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSave}
            />
        </div>
    )
};

export default AddAdvertisement;
