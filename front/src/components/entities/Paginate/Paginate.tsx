import { Pagination } from 'antd';
import React, { FC } from 'react';

interface IProps {
    current: number;
    pageSize: number;
    total: number;
    onChangePage: (page: number) => void;
    onChangeSize: (perPage: number) => void;
    className?: string;
}

const Paginate: FC<IProps> = ({
    current,
    pageSize,
    total,
    onChangePage,
    onChangeSize,
    className = '',
}) => {

    return (
        <Pagination
            className={className}
            current={current}
            pageSize={pageSize}
            pageSizeOptions={[5, 10, 20]}
            total={total}
            showSizeChanger
            onChange={(page) => {
                onChangePage(page)
            }}
            onShowSizeChange={(_, size) => {
                onChangeSize(size)
            }}
        />
    )
};

export default Paginate;