import React, { FC } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';

export interface IFormValues {
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
}

interface IProps {
    isModalVisible: boolean;
    onCancel: () => void;
    onOk: (values: IFormValues) => void;
    initialFormValues?: IFormValues;
    isEdit?: boolean;
}

const AdvertisementModal: FC<IProps> = ({
    isModalVisible,
    onCancel,
    onOk,
    initialFormValues,
    isEdit,
}) => {

    const modalTitle = isEdit ? 'Редактирование объявления' : 'Создание объявления';
    const okText = isEdit ? 'Сохранить' : 'Создать';

    const [form] = Form.useForm<IFormValues>();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onOk(values)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        if (!isEdit) {
            form.resetFields();
        }
        onCancel();
    }

    return (
        <Modal
            open={isModalVisible}
            title={modalTitle}
            onCancel={handleCancel}
            cancelText='Отмена'
            okText={okText}
            onOk={handleOk}
        >
            <Form
                form={form}
                initialValues={initialFormValues}
            >
                <Form.Item
                    name={'name'}
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        }
                    ]}
                    label='Название'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'price'}
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле'
                        },
                    ]}
                    label='Стоимость'
                >
                    <InputNumber min={1} />
                </Form.Item>
                <Form.Item
                    name={'description'}
                    label='Описание'
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name={'imageUrl'}
                    label='Картинка'
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default AdvertisementModal;