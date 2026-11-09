# Portfólio · Thiago Martins de Carvalho

Portfólio acadêmico e profissional do curso de **Desenvolvimento de Software Multiplataforma** da
**FATEC Prof. Jessen Vidal, São José dos Campos**.

**Site publicado:** https://fatec-sjc-dsm-portfolio.github.io/ra1461392411020/

## Seções

1. **Sobre** · apresentação, trajetória, habilidades, formação e experiência profissional.
2. **APIs** · os seis projetos integradores em cards. Cada card abre uma página própria com problema,
   solução, minhas contribuições individuais com links para PRs, issues e commits, hard skills, soft skills e
   tecnologias. A seção termina com o mapa da minha evolução ao longo das APIs.
3. **Outros projetos** · trabalhos profissionais, acadêmicos e pessoais.
4. **Contato**.

| API | Semestre | Projeto | Parceiro |
| --- | --- | --- | --- |
| 1 | 2024/1 | [Smart Farming](https://github.com/CtrI-Alt-Del/smart-farming) | Cliente interno |
| 2 | 2024/2 | [Stocker](https://github.com/CtrI-Alt-Del/stocker) | Cliente interno |
| 3 | 2025/1 | [Chronos](https://github.com/CtrI-Alt-Del/chronos) | Necto Systems |
| 4 | 2025/2 | [Gaia](https://github.com/CtrI-Alt-Del/gaia) | Tecsus |
| 5 | 2026/1 | [Animus](https://github.com/CtrI-Alt-Del/animus) | Xertica |
| 6 | 2026/2 | [Shifu](https://github.com/CtrI-Alt-Del/shifu) | GSW |

## Como rodar localmente

O site é estático, feito com HTML, CSS e JavaScript, sem etapa de build. Todos os arquivos necessários,
inclusive fontes e imagens, estão neste repositório.

```bash
python -m http.server 8000
```

Depois abra http://localhost:8000.

## Estrutura

```
index.html            página inicial
apis/*.html           uma página para cada API
assets/css/style.css  estilos, temas claro e escuro
assets/js/main.js     menu, troca de telas, visualizador de imagens e animações
assets/fonts/         fontes Bricolage Grotesque, Inter e JetBrains Mono
assets/img/           foto e capturas de tela das APIs
```

As capturas de tela das APIs vêm dos vídeos de entrega, dos manuais e da documentação dos repositórios do
time Ctrl Alt Del. Logos de empresas parceiras não são usados.
