
import React/*, { Component }*/ from 'react';

// import {Button} from './';
import Button from './Button';


const Loading = () =>
    <div>Завантаження ...</div>


export default Loading;


export const withLoading = Component => ({isLoading, ...rest}) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } /> 


export const ButtonWithLoading = withLoading(Button);
