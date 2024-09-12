import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TDispatch, TState } from "../store";

export const useAppDispatch = useDispatch.withTypes<TDispatch>();

export const useAppSelector = useSelector.withTypes<TState>();