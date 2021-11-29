import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {RootState, AppDispatch} from "./store";

//Use throughout your app instead of plain 'useDispatch' and 'useSelector'
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// useAppSelector: it saves you the need to type (state: RootState) every time
//useAppDispatch: the default Dispatch types doesn't know about thunks so in order to correctly dispatch thunk.