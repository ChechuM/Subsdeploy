// Conviene definir los contratos de interface de aquellas variables que son específicas de datos de mi proyecto (o sea, no de programación)
// conviene sacarlas de los componentes, definirlas en este file e importarlas, va a simplificar el código

// este file, con la forma en la que está definida con .d significa que aquí sólo puedo poner DEFINICIONES. Aquí no puedo poner una función o lógica

// Este proyecto es pequeno, de manera que puedo tener todos los types en uno solo, pero en proyectos más grandes una buena práctica es tener distintas carpetas con types de cada uno. 

export interface Sub {
    nick: string,
    avatar: string,
    subMonths: number,
    description?: string
}

export type SubsResponseFromApi = Array <{
  nick: string
  months: number
  profilerURL: string
  description?: string
}>