SaveAdd - Aplicativo Para Gestão Contratos de produtos que perderam seu valor comercial primário

Alguns pontos importantes a serem lembrandos durante o desenvolvimento:

- O Sistema é Mobile First, portanto, sempre teste mobile. Por padrão usamos 360 de width nos testes.
- Sempre teste a versão final de desenvolvimento em um dispositivo real.
- Clientes possuiem celulares antigos, sempre tenha isso em mente.
- A pasta modules/exemplo contém padrões a serem usados no desenvolvimento. Sempre que for fazer algo, siga o que está no exemplo, caso contrário diga que precisa de um exemplo para o seu caso especifico.

Uso do GIT - Essencial

- Todo desenvolvimento é feito em branches especificas: feature/issue-[%num_issue%] para funcionalidade nova e hotfix/issue-[%num_issue%] para correções pontuais de emergencia em produção.
- A branch development contém a última versão estável de desenvolvimento ou já selecionada para deployment. 
- a branch staging é usada para teste de deployment da versão de desenvolvimento antes de produção. Na maior parte do tempo ela é uma replica de produção. Ela nunca pode estar atrás de produção.
- a branch production contém a versão atual de produção. Ela nunca deve estar a frente de ninguém.
- Não faça commits nessas branches principais. Somente nas features/... ou hotfix/...
- Sua issue deve SEMPRE estar a frente de desenvolvimento, se não estiver, faça merge urgente. Não importa se você está com outra prioridade no momento, faça o merge e depois volte para onde parou.

GIT - Boas práticas, atenção aos detalhes

- Evite commitar código que não builda. Se precisar, deixe claro no comentário que o código não builda.
- Faça comentários claros do que foi feito em cada commit. Todo commit exige um comentário claro.
- Não faça commits monstros, um commit por tópico abordado.
- Evite commits mistos com refactoring e alterações de código juntos. Commits de refactoring devem estar separados.

Número de versões

O arquvio package.json contém o número da versão atual.
O número consiste em 4 subnúmeros:

1 - Major
Versão definida pelo comercial

2 - Minor
Alterada quando ocorre acrescimento ou alteração relevante de funcionalidades
Definida pelo responsável por públicações

3 - Patch
Alterada toda vez que subir algo para produção
Definida pelo responsável por públicações

4 - Build
Número da Issue que gerou aquela versão
Definida pelo programador em toda ISSUE em que esteja trabalhando

#### Texto padrão, como usar.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
