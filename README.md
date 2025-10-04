# 🎬 GUESS-THE-MOVIE

**Jogo interativo de adivinhação de filmes desenvolvido em TypeScript com Next.js e Tailwind CSS.**

O jogador recebe **dicas progressivas** sobre um filme aleatório e deve tentar acertar o título antes que acabem.  
Os dados são obtidos em tempo real pela **API do TMDB**, gerando pistas como gênero, elenco, diretor e muito mais.

👉 **Disponível em produção:**  
📎 [https://guess-the-movie-alpha.vercel.app/](https://guess-the-movie-alpha.vercel.app/)

---

## 🚀 Tecnologias

<p align="left">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img alt="TMDB" src="https://img.shields.io/badge/TMDB_API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white"/>
</p>

---

## 📌 Funcionalidades

- [x] Geração aleatória de filmes via **TMDB API**  
- [x] Dicas dinâmicas e inteligentes  
- [x] Sistema de pontuação  
- [x] Suporte a **português** e **inglês**  
- [x] Interface moderna e responsiva  

---

## 📂 Estrutura do Projeto (simplificada)

```bash
src/
├── app/
│   ├── components/
│   │   ├── LayoutComponents/    # Header e Footer
│   │   ├── MovieInput.tsx       # Campo de resposta do jogador
│   │   └── ResultModal.tsx      # Modal de resultado
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Controle de idioma
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Lógica e interface principal do jogo
├── globals.css                  # Estilos globais (Tailwind)
└── README.md
