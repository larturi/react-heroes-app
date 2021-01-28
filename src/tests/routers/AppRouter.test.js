import React from 'react';
import { mount } from "enzyme";
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('debe mostrar login si no esta autenticado', () => {

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />       
            </AuthContext.Provider>
        );

        expect(wrapper.find('h1').exists()).toBe(true);
        expect(wrapper.find('h1').html()).toBe('<h1>Login</h1>');
        
    });

    test('debe mostrar el componente marvel si esta autenticado', () => {

        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                nombre: 'Pedro'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter />       
            </AuthContext.Provider>
        );

        expect(wrapper.find('.navbar').exists()).toBe(true);
        
    });
    
    
    
});
