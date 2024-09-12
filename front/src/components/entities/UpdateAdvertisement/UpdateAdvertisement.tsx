import React, { FC, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAppDispatch } from "../../../hooks/storeHooks";
import { updateAdvertisementThunk } from "../../../store/slices/advertisementsSlice";
import { IAdvertisment } from "../../../types";
import AdvertisementModal from "../AdvertisementModal";
import { IFormValues } from "../AdvertisementModal/AdvertisementModal";

interface IProps {
    advertisement: IAdvertisment;
    className?: string;
}

const UpdateAdvertisement: FC<IProps> = ({
    advertisement,
    className = '',
}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const dispatch = useAppDispatch();

    const initialFormValues = {
        name: advertisement.name,
        price: advertisement.price,
        description: advertisement.description,
        imageUrl: advertisement.imageUrl,
    }

    const handleSave = async (values: IFormValues) => {
        try {
            await dispatch(updateAdvertisementThunk({ ...values, id: advertisement.id }));

            setIsModalVisible(false);
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

    return (
        <div className={className}>
            <Button
                icon={<EditOutlined />}
                onClick={() => {
                    setIsModalVisible(true)
                }}
            >
                Редактировать объявление
            </Button>
            <AdvertisementModal
                isModalVisible={isModalVisible}
                onCancel={handleCancel}
                initialFormValues={initialFormValues}
                onOk={handleSave}
                isEdit
            />
        </div>
    )
}

export default UpdateAdvertisement;