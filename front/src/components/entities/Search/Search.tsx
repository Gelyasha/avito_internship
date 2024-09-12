import React, { FC, useEffect, useMemo, useState } from 'react';
import { AutoComplete } from 'antd';

import classes from './Search.module.css';
import { useSelector } from 'react-redux';
import { selectAdvertisements } from '../../../store/selectors/advertisementsSelectors';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { setSearch } from '../../../store/slices/filtersSlice';
import { debounce } from 'lodash';

const Search: FC = () => {

    const [searchValue, setSearchValue] = useState('');

    const advertisements = useSelector(selectAdvertisements);

    const dispatch = useAppDispatch();

    const debouncedSearch = useMemo(() => {
        return debounce((value: string) => {
            dispatch(setSearch(value))
        }, 1000)
    }, [])

    const handleChangeSearch = (value: string) => {
        setSearchValue(value);
        debouncedSearch(value);
    }

    const options = advertisements.filter(item => {
        return item.name.indexOf(searchValue) != -1;
    }).map(item => {
        return {
            value: item.id,
            label: item.name
        }
    });

    useEffect(() => {
        return () => {
            debouncedSearch.cancel()
        }
    }, [])

    return (
        <div>
            <AutoComplete
                value={searchValue}
                onSearch={(value) => {
                    handleChangeSearch(value)
                }}
                className={classes.search}
                options={options}
                onSelect={(_, option) => {
                    handleChangeSearch(option.label)
                }}
                placeholder='Введи наимнование объявления'
            />
        </div>
    )
};

export default Search;