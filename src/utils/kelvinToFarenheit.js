import { kelvinToCelsius } from "./kelvinToCelsius"
export const kelvinToFarenheit = (kelvinDegrades) => {
    const celsius = parseFloat(kelvinToCelsius(kelvinDegrades));
    const farenheitConversion = 9/5;
    const farenheitConst = 32;
    return (celsius * farenheitConversion) + farenheitConst;
}