import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {

    test('debe retornar el estado por defecto', () => {

        const state = authReducer({logged: false}, {});
        expect(state).toEqual({logged: false});
        
    });

    test('debe autenticar y colocar el nombre del usuario', () => {

        const action = {
            type: types.login,
            payload: {
                nombre: 'Leandro'
            }
        };
        
        const state = authReducer({logged: false}, action);

        expect(state).toEqual({
            logged: true,
            nombre: 'Leandro'
        });

    });

    test('debe borrar el name del usuario y logged en false al hacer logout', () => {

        const action = {
            type: types.logout
        };
        
        const state = authReducer({logged: true, nombre: 'Pedro'}, action);

        expect(state).toEqual({
            logged: false
        });
        
    })
    
    
    
    
});
