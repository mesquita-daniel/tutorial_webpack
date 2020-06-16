# Tutorial de Webpack

Baseado em https://www.youtube.com/watch?v=TzdEpgONurw

## O que é?

É um bundler, o que proporciona:
 
* **Transpiling with Babel**  
Reescreve JS de uma forma que a maioria dos browses podem entender.

* **Tree shaking**
Elimination of dead code, minificationm asset management and other techniques to compress code size.

## Início

```console
npm init -y # cria package.json com tudo padrão
npm i -D webpack webpack-cli # instala pacotes como dependênciias de desenvolvedor
```

Conteúdo de sripts em package.json direcionam o comando `npm run xxx` para o que quer esteja especificado.

```json
{
  //...
  "scripts": {
    "build": "webpack" \\ npm run build vai executar webpack
  }
}
````

Webpack por padrão vai procurar por src/index.js e transpilá-lo para dist/main.js.

## Usar html com webpack

É necessário configuração adicional através de `webpack.config.js` e instalar mais pacotes:

```console
npm i -D html-webpack-plugin html-loader
````

Principal conteúdo do `webpack.config.js` é `module.exports`. Espera um objeto com atributo `module` que por sua vez espera um objeto com atributo `rules`.

`rules` recebe um vetor de objetos com atributos `test` e `use`. `use` espera vetor de objetos com `loader` e eventualmente `options`. Isso faz com que o módulo especificado em `loader` processe arquivos cujo nome obedem o regex especificado em `test`.

````js
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/, // regexes ficam entre /
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true}
                    }
                ]
            }
            // html-loader vai processar todos os arquivos que terminam com html
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
            // pega o que está no template e colocar o output no folder dist
        }),
    ]
}
````

Ao rodar `npm run build` html-webpack-plugin vai garantir que o html gerado em dist use scripts de main.js.

O módulo `webpack-dev-server` garante live server reloading.

```console
npm i -D webpack-dev-server
```

Convém também em `package.json` no atributo `scripts` especificar um comando que o execute com `npm run`.

```json
{
  ...
  "scripts": {
    "build": "webpack",
    "start:dev": "webpack-dev-server"
  }
  ...
}
```

## Usando com Babel

Babel é o que transpila js mais moderno para js5 por padrão.  
Pra usá-lo é necessário instalá-lo:

```console
npm i -D @babel/core babel-loader @babel/preset-env
```

E adicionar regra em `webpack.config.js`:

```js
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            ... //outras regras
    }
    ... //resto da configuração
}
```

## Asset management

Por padrão não serão carregados arquivos no html.  
Pra fazer isso é necessário instalar e configurar `file-loader`.

Para instalar:

```console
npm i -D file-loader
```
