//* Promisificar
export const getCoordinates = async () => {
    try {
        const position = await new Promise((resolve, reject) => {
            // Cuando se ejecuta resolve la promesa se resuelve con el valor pasado a resolve
            // Cuando se ejecuta reject la promesa se rechaza con el valor pasado a reject
            //* navigator es como document, está ahí
            //* Dos callbacks, una para cada caso
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return { latitude: position.coords.latitude, longitude: position.coords.longitude};
    } catch (_) {
        //* "_" = No lo necesito
        return null;
    }
};