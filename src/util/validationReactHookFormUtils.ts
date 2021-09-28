import {tekstTilBoolean} from './stringUtils';

export function valideringsFunksjoner(getValues, prop: string) {
  const erDatoFyltUt = dato => {
    if(!tekstTilBoolean(getValues()[prop])) return true;
    return dato.toLowerCase() !== 'dd.mm.åååå' && dato !== '';
  };

  const erDatoSisteDagenIÅret = dato => {
    if(!tekstTilBoolean(getValues()[prop])) return true;
    return dato.substr(5, 5) === '12-31';
  };

  const erDatoGyldig = dato => {
    if(!tekstTilBoolean(getValues()[prop])) return true;
    const år = parseInt(dato.substr(0, 4));
    const måned = parseInt(dato.substr(5, 2)) - 1;
    const dag = parseInt(dato.substr(8, 2));
    const parsedDato = new Date(år, måned, dag);

    if (parsedDato.getDate() === dag) return true;
    return false;
  };

  const erAvslagsArsakErPeriodeErIkkeOverSeksMånGyldig = val => {
    if(tekstTilBoolean(getValues()[prop])) return true;
    return val !== null && val.length > 0;
  };

  return {erDatoFyltUt, erDatoGyldig, erAvslagsArsakErPeriodeErIkkeOverSeksMånGyldig, erDatoSisteDagenIÅret};
}