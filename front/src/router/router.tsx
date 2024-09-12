import React, { FC } from "react";
import {
    createBrowserRouter,
    useRouteError,
    ErrorResponse
} from 'react-router-dom';
import Layout from "../components/Layout";
import AdvertisementsPage from "../components/Pages/AdvertisementsPage";
import OrdersPage from "../components/Pages/OrdersPage";
import Page404 from "../components/Pages/Page404";
import AdvertisementPage from "../components/Pages/AdvertisementPage";

interface IErrorBoundaryProps {
    errorMessage?: string;
}

const ErrorBoundary: FC<IErrorBoundaryProps> = ({ errorMessage = 'Произошла ошибка 😕' }) => {
    const error = useRouteError() as ErrorResponse;
    if (error.data) {
        return (
            <div>{error.data}</div>
        )
    }
    return <div>{errorMessage}</div>;
}

export const router = createBrowserRouter([
    {
        path: '/',
        ErrorBoundary,
        element: (
            <Layout>
                <AdvertisementsPage />
            </Layout>
        ),
    },
    {
        path: 'advertisements/:advertisementId',
        ErrorBoundary,
        element: (
            <Layout>
                <AdvertisementPage />
            </Layout>
        )
    },

    {
        path: '/orders',
        ErrorBoundary,
        element: (
            <Layout>
                <OrdersPage />
            </Layout>
        )
    },
    {
        path: '*',
        ErrorBoundary,
        element: (
            <Layout>
                <Page404 />
            </Layout>
        )
    },
]);

export default router