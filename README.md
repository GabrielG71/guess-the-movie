# 🎬 GUESS-THE-MOVIE

**🎯 Interactive movie guessing game built with TypeScript, Next.js, and Tailwind CSS.**  
**🎯 Jogo interativo de adivinhação de filmes desenvolvido em TypeScript com Next.js e Tailwind CSS.**

The player receives **progressive hints** about a random movie and must guess the title before running out of clues.  
O jogador recebe **dicas progressivas** sobre um filme aleatório e deve tentar acertar o título antes que acabem.  

Data is fetched in real time from the **TMDB API**, generating hints like genre, cast, director, and more.  
Os dados são obtidos em tempo real pela **API do TMDB**, gerando pistas como gênero, elenco, diretor e muito mais.  

👉 **Live version / Versão em produção:**  
📎 [https://guess-the-movie-alpha.vercel.app/](https://guess-the-movie-alpha.vercel.app/)

---

## 🚀 Technologies / Tecnologias

<p align="left">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img alt="TMDB" src="https://img.shields.io/badge/TMDB_API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white"/>
</p>

---

## 📌 Features / Funcionalidades

- 🎲 Random movie generation via **TMDB API**  
  Geração aleatória de filmes via **TMDB API**
- 💡 Smart and dynamic hints  
  Dicas dinâmicas e inteligentes  
- 🏆 Scoring system  
  Sistema de pontuação  
- 🌐 **English and Portuguese support**  
  Suporte a **inglês** e **português**
- 💻 Modern and responsive UI  
  Interface moderna e responsiva  

---

## 🌐 Language Support / Suporte a Idiomas

You can switch between **English 🇺🇸** and **Portuguese 🇧🇷** through the **Header or Footer** by clicking the respective flag.  
Você pode alternar entre **inglês 🇺🇸** e **português 🇧🇷** pelo **Header ou Footer**, clicando na bandeira correspondente.  

Language control is handled by the **`LanguageContext`**, ensuring dynamic translation across the entire interface.  
A troca de idioma é controlada pelo **`LanguageContext`**, garantindo que toda a interface e dicas mudem dinamicamente.

---

## 📂 Project Structure (simplified) / Estrutura do Projeto (simplificada)

```bash
src/
├── app/
│   ├── components/
│   │   ├── LayoutComponents/    # Header and Footer / Cabeçalho e Rodapé
│   │   ├── MovieInput.tsx       # Player input / Campo de resposta
│   │   └── ResultModal.tsx      # Result modal / Modal de resultado
│   ├── contexts/
│   │   └── LanguageContext.tsx  # Language management / Controle de idioma
│   ├── layout.tsx               # Main layout / Layout principal
│   └── page.tsx                 # Game logic and UI / Lógica e interface do jogo
├── globals.css                  # Global styles (Tailwind)
└── README.md
