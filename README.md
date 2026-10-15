# Engenharia de Torque & Automação 4.0

> Plataforma técnica e blog profissional dedicado à engenharia mecânica, aperto crítico (VDI 2230 / ISO 898-1 / ISO 16047), metrologia de fixadores, automação industrial e manufatura inteligente na Indústria 4.0.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 19, TypeScript
- **Estilização:** Tailwind CSS (tema Azul Marinho, Grafite e Dourado)
- **Ícones:** Lucide React
- **Animações:** Motion (Framer Motion)
- **Build Tool:** Vite

---

## ⚙️ Funcionalidades Principais

1. **Calculadora Analítica de Torque & Pré-Carga (VDI 2230)**:
   - Cálculo de força de pré-carga ($F_M$) e torque de aperto ($M_A$) segundo VDI 2230 e ISO 898-1.
   - Seleção de fixadores métricos padronizados (M3 a M24).
   - Classes de resistência (4.8, 5.8, 8.8, 10.9, 12.9).
   - Presets e ajuste contínuo de coeficiente de atrito total ($\mu$).
   - Gráfico de curva característica de aperto (Torque x Ângulo) com indicação do ponto de operação e limite de escoamento.
   - Conversor rápido de unidades ($N\cdot m$, $lbf\cdot ft$, $lbf\cdot in$, $kgf\cdot m$).
   - Modal explicativo detalhado ("Sobre a Calculadora") com fundamentação matemática.

2. **Artigos Técnicos, Estudos de Caso & Blog**:
   - Categorias dedicadas: Indústria 4.0, Aperto Crítico, Tutoriais Práticos, Histórias de Chão de Fábrica, Automação & PLC, Estudos de Caso.
   - Busca em tempo real e filtros por categoria temática.
   - Leitura detalhada com parâmetros técnicos (Fixador, Torque, Tipo de Junta, Criticidade).
   - Sistema interativo de comentários e curtidas.

3. **Gerenciador de Rascunhos & Publicação**:
   - Criação, edição e exclusão de artigos com persistência local (`localStorage`).
   - Pré-visualização de formatação antes da publicação.

4. **Portfólio de Projetos & Matriz de Competências**:
   - Exposição de células robotizadas e sistemas de rastreabilidade.
   - Matriz de habilidades em calibração, IATF 16949, Open Protocol e programação de apertadeiras.

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- Gerenciador de pacotes `npm` ou `yarn`

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   cd NOME_DO_REPOSITORIO
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:3000](http://localhost:3000) (ou a porta indicada no terminal).

5. **Gerar build de produção:**
   ```bash
   npm run build
   ```

---

## 📄 Licença
Distribuído sob licença livre para fins educacionais e de demonstração profissional.
