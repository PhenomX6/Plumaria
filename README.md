# Plumária

Site institucional e portfólio de branding, design e audiovisual da Plumária.

[Visitar o site](https://www.plumaria.com.br) · [Endereço Vercel](https://plumaria.vercel.app)

## Experiência

- Identidade escura, tipografia editorial e destaques verdes.
- Portfólio com Nutravance, Zeloo, Mercadão Agropet e Duffi.
- Páginas de projeto com imagens originais e galeria ampliável. Use os botões ou as setas do teclado para navegar; Escape fecha a galeria.
- Serviços em seções expansíveis e apresentação dos fundadores.
- Navegação adaptada ao celular, com fechamento por Escape, controle de foco e indicação de estado.
- Animações discretas que respeitam a preferência de movimento reduzido.
- Formulário de contato integrado ao FormSubmit, seleção opcional de serviços, validação nativa e proteção por campo oculto.
- Contatos por e-mail e WhatsApp preservados.

## Desenvolvimento

HTML, CSS e JavaScript sem etapa de build ou instalação de pacotes. Fontes Manrope e DM Sans servidas pelo Google Fonts, com fontes locais de fallback.

Sirva a pasta com o Live Server do VS Code ou com Python:

```sh
python -m http.server 8080
```

Abra http://localhost:8080. O formulário utiliza um serviço externo e deve ser testado com autorização para enviar uma mensagem real. O retorno após o envio utiliza o endereço de origem atual e a página `obrigado.html`.

## Estrutura

- `index.html`: página inicial, portfólio, serviços e estúdio.
- `nutravance.html`, `zeloo.html`, `mercadao.html`, `duffi.html`: projetos e galerias.
- `contato.html`: formulário e canais de contato.
- `obrigado.html`: confirmação após envio.
- `style.css` e `script.js`: apresentação e interações compartilhadas.
- `assets/`: identidade, fotos e aplicações dos projetos.

## Publicação

A integração existente entre GitHub e Vercel publica as alterações da branch principal. A reformulação mantém os caminhos das páginas e os arquivos de imagem originais.
