# Ejemplo de verificación de identidad comparando dos fotos

Éste es un ejemplo de API de reconocimiento visual creado con expressjs y face-api.js

## Obtener una copia local
``` bash
git clone https://github.com/carlosmart7104/face-verification-test.git
```

### Moverse a la carpeta e instalar dependencias
``` bash
cd face-verification-test
npm i
```

### Ejecutar el servidor
``` bash
npm run start
```
Luego de esto puede ver abrir en el navegador: http://localhost:3000

# API
El uso del api es el siguiente:
``` bash
const URL = '/api/verify';
const METHOD = 'POST';
const HEADERS = {
  'Content-Type': 'application/json'
};
const BODY = JSON.stringify({
  threshold: 0.5, // ajuste de aceptación
  a: string, // primera foto codificada en base64
  b: string // segunda foto codificada en base64
});
fetch(URL, { method: METHOD, headers: HEADERS, body: BODY })
  .then((response) => {
    response.json()
      .then((data) => {
        console.log(`result: ${JSON.stringify(data)}`);
      })
      .catch(error => console.log(error));
  })
  .catch(error => console.log(error));
```
El objeto devuelto es un error o un json con el siguiente formato:
``` bash
{
  threshold: number, // Umbral de aceptación, de menor similitud (0.0) a mayor similitud (1.0)
  distante: number, // Distancia euclidiana (similitud entre 0.0 y 1.0)
  match: boolean // Coincidencia (será verdadero si distance < threshold, de lo contrario será falso)
}
```
