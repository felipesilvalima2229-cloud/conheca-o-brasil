// =============================================================================
// CONHEÇA O BRASIL - IBGE Data Module
// Condições de vida, desigualdade e pobreza
// Baseado em dados reais do IBGE (PNAD Contínua, Síntese de Indicadores Sociais)
// =============================================================================

// ─── TypeScript Interfaces ───────────────────────────────────────────────────

export interface YearValuePair {
  year: number;
  value: number;
}

export interface RegionData {
  region: string;
  value: number;
}

export interface RegionIncomeData {
  region: string;
  income: number;
}

export interface RaceIncomeData {
  race: string;
  income: number;
}

export interface SexIncomeData {
  sex: string;
  income: number;
}

export interface StatePovertyData {
  state: string;
  rate: number;
}

export interface QuintileData {
  label: string;
  percentage: number;
}

export interface Curiosidade {
  id: string;
  text: string;
  category: string;
  year?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
}

// ─── 1. Poverty Rate (US$ 6.85 PPP/day) ─────────────────────────────────────

export const povertyRate: YearValuePair[] = [
  { year: 2012, value: 24.8 },
  { year: 2013, value: 22.7 },
  { year: 2014, value: 20.5 },
  { year: 2015, value: 22.9 },
  { year: 2016, value: 25.1 },
  { year: 2017, value: 25.4 },
  { year: 2018, value: 24.7 },
  { year: 2019, value: 23.2 },
  { year: 2020, value: 21.7 },
  { year: 2021, value: 28.4 },
  { year: 2022, value: 25.5 },
  { year: 2023, value: 27.3 },
  { year: 2024, value: 23.1 },
];

// ─── 2. Extreme Poverty Rate (US$ 2.15 PPP/day) ────────────────────────────

export const extremePovertyRate: YearValuePair[] = [
  { year: 2012, value: 7.1 },
  { year: 2013, value: 5.9 },
  { year: 2014, value: 4.8 },
  { year: 2015, value: 5.9 },
  { year: 2016, value: 7.0 },
  { year: 2017, value: 7.4 },
  { year: 2018, value: 7.1 },
  { year: 2019, value: 6.5 },
  { year: 2020, value: 5.7 },
  { year: 2021, value: 8.4 },
  { year: 2022, value: 7.0 },
  { year: 2023, value: 4.4 },
  { year: 2024, value: 3.5 },
];

// ─── 3. Gini Index by Year ──────────────────────────────────────────────────

export const giniIndex: YearValuePair[] = [
  { year: 2012, value: 0.530 },
  { year: 2013, value: 0.527 },
  { year: 2014, value: 0.518 },
  { year: 2015, value: 0.518 },
  { year: 2016, value: 0.521 },
  { year: 2017, value: 0.519 },
  { year: 2018, value: 0.517 },
  { year: 2019, value: 0.519 },
  { year: 2020, value: 0.524 },
  { year: 2021, value: 0.529 },
  { year: 2022, value: 0.518 },
  { year: 2023, value: 0.517 },
  { year: 2024, value: 0.504 },
];

// ─── 4. Average Monthly Income by Region (R$, 2024) ─────────────────────────

export const incomeByRegion: RegionIncomeData[] = [
  { region: "Norte", income: 1617 },
  { region: "Nordeste", income: 1398 },
  { region: "Sudeste", income: 2731 },
  { region: "Sul", income: 2465 },
  { region: "Centro-Oeste", income: 2589 },
  { region: "Brasil", income: 2181 },
];

// ─── 5. Poverty Rate by Region (2024) ───────────────────────────────────────

export const povertyByRegion: RegionData[] = [
  { region: "Norte", value: 34.2 },
  { region: "Nordeste", value: 34.8 },
  { region: "Sudeste", value: 15.0 },
  { region: "Sul", value: 13.5 },
  { region: "Centro-Oeste", value: 16.2 },
];

// ─── 6. Income Inequality - Palma Ratio by Year ─────────────────────────────

export const palmaRatio: YearValuePair[] = [
  { year: 2012, value: 15.8 },
  { year: 2013, value: 15.2 },
  { year: 2014, value: 14.3 },
  { year: 2015, value: 14.4 },
  { year: 2016, value: 14.6 },
  { year: 2017, value: 14.5 },
  { year: 2018, value: 14.3 },
  { year: 2019, value: 14.5 },
  { year: 2020, value: 14.8 },
  { year: 2021, value: 15.3 },
  { year: 2022, value: 13.9 },
  { year: 2023, value: 13.7 },
  { year: 2024, value: 13.4 },
];

// ─── 7. Population in Poverty by State (Top 10, 2024) ───────────────────────

export const povertyByState: StatePovertyData[] = [
  { state: "Maranhão", rate: 42.5 },
  { state: "Alagoas", rate: 38.2 },
  { state: "Piauí", rate: 35.8 },
  { state: "Amazonas", rate: 35.1 },
  { state: "Acre", rate: 34.7 },
  { state: "Paraíba", rate: 32.9 },
  { state: "Sergipe", rate: 31.5 },
  { state: "Bahia", rate: 31.2 },
  { state: "Roraima", rate: 30.8 },
  { state: "Ceará", rate: 29.5 },
];

// ─── 8. Social Indicators by Year ───────────────────────────────────────────

export const literacyRate: YearValuePair[] = [
  { year: 2012, value: 91.8 },
  { year: 2015, value: 93.0 },
  { year: 2019, value: 93.7 },
  { year: 2022, value: 94.4 },
  { year: 2024, value: 95.2 },
];

export const waterSupplyAccess: YearValuePair[] = [
  { year: 2012, value: 83.9 },
  { year: 2015, value: 85.6 },
  { year: 2019, value: 87.5 },
  { year: 2022, value: 88.8 },
  { year: 2024, value: 90.1 },
];

export const sewageAccess: YearValuePair[] = [
  { year: 2012, value: 50.3 },
  { year: 2015, value: 53.5 },
  { year: 2019, value: 57.1 },
  { year: 2022, value: 60.2 },
  { year: 2024, value: 63.5 },
];

export const internetAccessAtHome: YearValuePair[] = [
  { year: 2012, value: 43.3 },
  { year: 2015, value: 58.3 },
  { year: 2019, value: 72.2 },
  { year: 2022, value: 83.0 },
  { year: 2024, value: 87.5 },
];

// ─── 9. Average Income by Color/Race (2024, R$/month) ───────────────────────

export const incomeByRace: RaceIncomeData[] = [
  { race: "Branca", income: 3014 },
  { race: "Preta", income: 1834 },
  { race: "Parda", income: 1762 },
  { race: "Amarela", income: 2520 },
  { race: "Indígena", income: 1235 },
];

// ─── 10. Average Income by Sex (2024, R$/month) ─────────────────────────────

export const incomeBySex: SexIncomeData[] = [
  { sex: "Homem", income: 2567 },
  { sex: "Mulher", income: 1829 },
];

// ─── 11. Employment Rate by Year ────────────────────────────────────────────

export const employmentRate: YearValuePair[] = [
  { year: 2012, value: 56.3 },
  { year: 2013, value: 57.1 },
  { year: 2014, value: 57.7 },
  { year: 2015, value: 56.1 },
  { year: 2016, value: 54.7 },
  { year: 2017, value: 54.8 },
  { year: 2018, value: 55.3 },
  { year: 2019, value: 56.0 },
  { year: 2020, value: 51.8 },
  { year: 2021, value: 54.3 },
  { year: 2022, value: 56.8 },
  { year: 2023, value: 57.9 },
  { year: 2024, value: 58.5 },
];

// ─── 12. Population Estimates (millions) ────────────────────────────────────

export const populationEstimates: YearValuePair[] = [
  { year: 2012, value: 198.6 },
  { year: 2013, value: 200.4 },
  { year: 2014, value: 202.2 },
  { year: 2015, value: 204.0 },
  { year: 2016, value: 205.7 },
  { year: 2017, value: 207.4 },
  { year: 2018, value: 209.0 },
  { year: 2019, value: 210.5 },
  { year: 2020, value: 211.8 },
  { year: 2021, value: 213.2 },
  { year: 2022, value: 214.5 },
  { year: 2023, value: 215.8 },
  { year: 2024, value: 217.0 },
];

// ─── 13. HDI by Region ──────────────────────────────────────────────────────

export const hdiByRegion: RegionData[] = [
  { region: "Norte", value: 0.667 },
  { region: "Nordeste", value: 0.663 },
  { region: "Sudeste", value: 0.766 },
  { region: "Sul", value: 0.758 },
  { region: "Centro-Oeste", value: 0.738 },
];

// ─── 14. Income Distribution by Quintile (2024) ─────────────────────────────

export const incomeDistributionByQuintile: QuintileData[] = [
  { label: "20% mais pobres", percentage: 3.2 },
  { label: "2º quintil", percentage: 7.8 },
  { label: "3º quintil", percentage: 12.5 },
  { label: "4º quintil", percentage: 19.8 },
  { label: "20% mais ricos", percentage: 56.7 },
];

// ─── 15. Child Poverty Rate (0-14 years) ────────────────────────────────────

export const childPovertyRate: YearValuePair[] = [
  { year: 2012, value: 29.1 },
  { year: 2015, value: 26.8 },
  { year: 2019, value: 25.2 },
  { year: 2021, value: 33.7 },
  { year: 2023, value: 28.3 },
  { year: 2024, value: 23.8 },
];

// ─── 16. Elderly (65+) in Poverty ───────────────────────────────────────────

export const elderlyPovertyRate: YearValuePair[] = [
  { year: 2012, value: 12.3 },
  { year: 2015, value: 10.2 },
  { year: 2019, value: 9.8 },
  { year: 2021, value: 14.2 },
  { year: 2023, value: 11.7 },
  { year: 2024, value: 9.3 },
];

// ─── 17. Informal Employment Rate ───────────────────────────────────────────

export const informalEmploymentRate: YearValuePair[] = [
  { year: 2012, value: 37.8 },
  { year: 2015, value: 38.2 },
  { year: 2019, value: 40.7 },
  { year: 2021, value: 39.5 },
  { year: 2023, value: 38.9 },
  { year: 2024, value: 37.5 },
];

// ─── 18. Social Program Beneficiaries (millions) ────────────────────────────

export const socialProgramBeneficiaries: YearValuePair[] = [
  { year: 2012, value: 13.9 },
  { year: 2015, value: 13.8 },
  { year: 2019, value: 14.2 },
  { year: 2021, value: 14.6 },
  { year: 2022, value: 20.6 },
  { year: 2023, value: 21.4 },
  { year: 2024, value: 20.1 },
];

// ─── 19. Food Insecurity (moderate/severe, %) ───────────────────────────────

export const foodInsecurity: YearValuePair[] = [
  { year: 2013, value: 22.6 },
  { year: 2018, value: 25.7 },
  { year: 2020, value: 30.2 },
  { year: 2022, value: 27.7 },
  { year: 2024, value: 23.1 },
];

// ─── 20. Housing Conditions (% with adequate housing) ───────────────────────

export const housingConditions: YearValuePair[] = [
  { year: 2012, value: 62.4 },
  { year: 2015, value: 66.3 },
  { year: 2019, value: 70.8 },
  { year: 2022, value: 74.2 },
  { year: 2024, value: 77.5 },
];

// ─── 21. School Enrollment Rate (6-14 years, %) ─────────────────────────────

export const schoolEnrollmentRate: YearValuePair[] = [
  { year: 2012, value: 97.1 },
  { year: 2015, value: 97.8 },
  { year: 2019, value: 98.2 },
  { year: 2022, value: 98.5 },
  { year: 2024, value: 98.9 },
];

// =============================================================================
// CURIOSIDADES - Interesting facts and insights derived from IBGE data
// =============================================================================

export const curiosidades: Curiosidade[] = [
  {
    id: "cur-01",
    text: "Em 2024, o Brasil atingiu a menor taxa de pobreza extrema da série histórica, com apenas 3,5% da população sobrevivendo com menos de US$ 2,15 por dia.",
    category: "Pobreza",
    year: 2024,
  },
  {
    id: "cur-02",
    text: "O Índice de Gini caiu de 0,530 em 2012 para 0,504 em 2024, a menor marca da série histórica, indicando uma redução na desigualdade de renda ao longo de 12 anos.",
    category: "Desigualdade",
    year: 2024,
  },
  {
    id: "cur-03",
    text: "Aproximadamente 8,6 milhões de pessoas saíram da pobreza entre 2023 e 2024, uma das maiores reduções anuais já registradas.",
    category: "Pobreza",
    year: 2024,
  },
  {
    id: "cur-04",
    text: "A região Nordeste tem a maior taxa de pobreza do país (34,8%), seguida de perto pela Norte (34,2%). Juntas, concentram quase 70% da pobreza brasileira.",
    category: "Pobreza",
    year: 2024,
  },
  {
    id: "cur-05",
    text: "O rendimento médio mensal de pessoas brancas (R$ 3.014) é 71% superior ao de pessoas pardas (R$ 1.762), evidenciando a persistência da desigualdade racial no Brasil.",
    category: "Desigualdade",
    year: 2024,
  },
  {
    id: "cur-06",
    text: "As mulheres ganham em média R$ 738 a menos que os homens (R$ 1.829 vs R$ 2.567), uma diferença de quase 29% que revela a desigualdade de gênero no mercado de trabalho.",
    category: "Renda",
    year: 2024,
  },
  {
    id: "cur-07",
    text: "Os 20% mais ricos concentram 56,7% de toda a renda do país, enquanto os 20% mais pobres ficam com apenas 3,2% — uma relação de quase 18 para 1.",
    category: "Desigualdade",
    year: 2024,
  },
  {
    id: "cur-08",
    text: "O Maranhão é o estado com a maior taxa de pobreza do Brasil: 42,5% de sua população vive abaixo da linha de pobreza em 2024.",
    category: "Pobreza",
    year: 2024,
  },
  {
    id: "cur-09",
    text: "Em 2021, durante a pandemia, a taxa de pobreza atingiu o pico de 28,4% e a pobreza extrema chegou a 8,4%, o maior valor da série histórica.",
    category: "Pobreza",
    year: 2021,
  },
  {
    id: "cur-10",
    text: "O acesso à internet em domicílios mais que dobrou em 12 anos, passando de 43,3% em 2012 para 87,5% em 2024 — uma transformação digital significativa.",
    category: "Infraestrutura",
    year: 2024,
  },
  {
    id: "cur-11",
    text: "A taxa de alfabetização do Brasil alcançou 95,2% em 2024, mas ainda há cerca de 10,4 milhões de analfabetos no país.",
    category: "Educação",
    year: 2024,
  },
  {
    id: "cur-12",
    text: "A pobreza infantil (0-14 anos) é sistematicamente maior que a geral: em 2024, 23,8% das crianças estavam em situação de pobreza contra 23,1% da população total.",
    category: "Pobreza",
    year: 2024,
  },
  {
    id: "cur-13",
    text: "A população indígena tem o menor rendimento médio mensal (R$ 1.235), equivalente a apenas 41% da renda da população branca.",
    category: "Desigualdade",
    year: 2024,
  },
  {
    id: "cur-14",
    text: "O Bolsa Família atingiu 21,4 milhões de famílias beneficiárias em 2023, o maior número da história do programa, desempenhando papel crucial na redução da pobreza.",
    category: "Política Social",
    year: 2023,
  },
  {
    id: "cur-15",
    text: "O acesso a esgotamento sanitário subiu de 50,3% em 2012 para 63,5% em 2024, mas ainda significa que mais de 79 milhões de brasileiros não têm coleta de esgoto.",
    category: "Infraestrutura",
    year: 2024,
  },
  {
    id: "cur-16",
    text: "A região Sudeste tem renda média mensal de R$ 2.731, quase o dobro da região Nordeste (R$ 1.398), revelando uma profunda desigualdade regional.",
    category: "Desigualdade",
    year: 2024,
  },
  {
    id: "cur-17",
    text: "Em 2020, a pandemia causou a maior queda na taxa de ocupação: de 56,0% para 51,8%, retirando milhões de trabalhadores do mercado formal e informal.",
    category: "Emprego",
    year: 2020,
  },
  {
    id: "cur-18",
    text: "A insegurança alimentar moderada/grave atingiu o pico de 30,2% em 2020 — quase 1 em cada 3 brasileiros não tinha acesso regular e suficiente a alimentos.",
    category: "Segurança Alimentar",
    year: 2020,
  },
  {
    id: "cur-19",
    text: "A taxa de escolarização de crianças de 6 a 14 anos chegou a 98,9% em 2024, uma das maiores do mundo nessa faixa etária.",
    category: "Educação",
    year: 2024,
  },
  {
    id: "cur-20",
    text: "O IDH da região Nordeste (0,663) é comparável ao de países como Índia e Vietnã, enquanto o Sudeste (0,766) se aproxima de nações como Uruguai e Argentina.",
    category: "Desigualdade",
    year: 2024,
  },
  {
    id: "cur-21",
    text: "O Palma Ratio caiu de 15,8 em 2012 para 13,4 em 2024, indicando que os 10% mais ricos hoje concentram 13,4 vezes mais renda que os 40% mais pobres.",
    category: "Desigualdade",
    year: 2024,
  },
  {
    id: "cur-22",
    text: "A população idosa (65+) tem a menor taxa de pobreza entre os grupos etários: 9,3% em 2024, contra 23,8% das crianças, refletindo o papel da Previdência Social.",
    category: "Pobreza",
    year: 2024,
  },
  {
    id: "cur-23",
    text: "Entre 2012 e 2024, o Brasil cresceu em 18,4 milhões de habitantes, passando de 198,6 para 217,0 milhões, o que intensifica os desafios de distribuição de renda.",
    category: "Demografia",
    year: 2024,
  },
  {
    id: "cur-24",
    text: "O emprego informal afeta 37,5% dos trabalhadores em 2024. No pico de 2019, eram 40,7%, o que significa que milhões não têm direitos trabalhistas garantidos.",
    category: "Emprego",
    year: 2024,
  },
  {
    id: "cur-25",
    text: "A proporção de domicílios com habitação adequada subiu de 62,4% em 2012 para 77,5% em 2024, mas ainda há mais de 48 milhões de brasileiros em condições inadequadas.",
    category: "Habitação",
    year: 2024,
  },
];

// =============================================================================
// QUIZ QUESTIONS - 25 questions about IBGE data
// =============================================================================

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q01",
    question: "Qual foi a taxa de pobreza extrema (US$ 2,15/dia) do Brasil em 2024?",
    options: ["5,2%", "3,5%", "7,1%", "4,4%"],
    correctIndex: 1,
    category: "Pobreza",
  },
  {
    id: "q02",
    question: "Qual região brasileira possui a maior taxa de pobreza em 2024?",
    options: ["Norte", "Nordeste", "Sudeste", "Centro-Oeste"],
    correctIndex: 1,
    category: "Pobreza",
  },
  {
    id: "q03",
    question: "Qual é o valor do Índice de Gini do Brasil em 2024?",
    options: ["0,530", "0,518", "0,504", "0,517"],
    correctIndex: 2,
    category: "Desigualdade",
  },
  {
    id: "q04",
    question: "Qual estado brasileiro tem a maior taxa de pobreza em 2024?",
    options: ["Alagoas", "Maranhão", "Piauí", "Amazonas"],
    correctIndex: 1,
    category: "Pobreza",
  },
  {
    id: "q05",
    question: "Qual é a renda média mensal da população branca no Brasil em 2024?",
    options: ["R$ 2.567", "R$ 2.520", "R$ 3.014", "R$ 1.834"],
    correctIndex: 2,
    category: "Renda",
  },
  {
    id: "q06",
    question: "Em que ano a taxa de pobreza (US$ 6,85/dia) atingiu seu maior valor na série histórica?",
    options: ["2020", "2017", "2023", "2021"],
    correctIndex: 3,
    category: "Pobreza",
  },
  {
    id: "q07",
    question: "Qual porcentagem da renda total é concentrada nos 20% mais ricos da população em 2024?",
    options: ["56,7%", "43,3%", "19,8%", "40,2%"],
    correctIndex: 0,
    category: "Desigualdade",
  },
  {
    id: "q08",
    question: "Qual região tem o maior rendimento médio mensal em 2024?",
    options: ["Sul", "Sudeste", "Centro-Oeste", "Norte"],
    correctIndex: 1,
    category: "Renda",
  },
  {
    id: "q09",
    question: "Qual é a taxa de alfabetização do Brasil em 2024?",
    options: ["93,7%", "94,4%", "95,2%", "97,1%"],
    correctIndex: 2,
    category: "Educação",
  },
  {
    id: "q10",
    question: "Quantos milhões de famílias eram beneficiárias do Bolsa Família no pico do programa em 2023?",
    options: ["14,2 milhões", "20,6 milhões", "21,4 milhões", "20,1 milhões"],
    correctIndex: 2,
    category: "Política Social",
  },
  {
    id: "q11",
    question: "Qual é a diferença salarial entre homens e mulheres em 2024?",
    options: [
      "Homens ganham R$ 738 a mais",
      "Mulheres ganham R$ 500 a mais",
      "Homens ganham R$ 1.200 a mais",
      "Não há diferença significativa",
    ],
    correctIndex: 0,
    category: "Desigualdade",
  },
  {
    id: "q12",
    question: "Em que ano a insegurança alimentar moderada/grave atingiu seu pico?",
    options: ["2018", "2020", "2022", "2024"],
    correctIndex: 1,
    category: "Segurança Alimentar",
  },
  {
    id: "q13",
    question: "Qual é o IDH da região Nordeste?",
    options: ["0,738", "0,663", "0,667", "0,758"],
    correctIndex: 1,
    category: "Desigualdade",
  },
  {
    id: "q14",
    question: "Qual porcentagem da população brasileira tem acesso a esgotamento sanitário em 2024?",
    options: ["50,3%", "57,1%", "60,2%", "63,5%"],
    correctIndex: 3,
    category: "Infraestrutura",
  },
  {
    id: "q15",
    question: "Qual grupo racial tem o menor rendimento médio mensal em 2024?",
    options: ["Preta", "Parda", "Indígena", "Preta e Parda empatam"],
    correctIndex: 2,
    category: "Renda",
  },
  {
    id: "q16",
    question: "A taxa de escolarização de crianças de 6 a 14 anos em 2024 é de aproximadamente:",
    options: ["95,2%", "97,1%", "98,9%", "99,5%"],
    correctIndex: 2,
    category: "Educação",
  },
  {
    id: "q17",
    question: "Qual foi o impacto da pandemia na taxa de ocupação em 2020?",
    options: [
      "Subiu de 56,0% para 57,0%",
      "Caiu de 56,0% para 51,8%",
      "Caiu de 58,5% para 54,3%",
      "Manteve-se estável",
    ],
    correctIndex: 1,
    category: "Emprego",
  },
  {
    id: "q18",
    question: "O Palma Ratio em 2024 indica que os 10% mais ricos concentram quantas vezes mais renda que os 40% mais pobres?",
    options: ["15,8 vezes", "14,3 vezes", "13,4 vezes", "13,7 vezes"],
    correctIndex: 2,
    category: "Desigualdade",
  },
  {
    id: "q19",
    question: "Qual é a taxa de pobreza infantil (0-14 anos) em 2024?",
    options: ["33,7%", "28,3%", "23,8%", "23,1%"],
    correctIndex: 2,
    category: "Pobreza",
  },
  {
    id: "q20",
    question: "Qual porcentagem de domicílios brasileiros tem acesso à internet em 2024?",
    options: ["72,2%", "83,0%", "87,5%", "90,1%"],
    correctIndex: 2,
    category: "Infraestrutura",
  },
  {
    id: "q21",
    question: "Qual região tem o menor IDH no Brasil?",
    options: ["Norte", "Nordeste", "Centro-Oeste", "Sul"],
    correctIndex: 1,
    category: "Desigualdade",
  },
  {
    id: "q22",
    question: "Quantos milhões de habitantes o Brasil tinha em 2024 segundo as estimativas?",
    options: ["210,5 milhões", "214,5 milhões", "215,8 milhões", "217,0 milhões"],
    correctIndex: 3,
    category: "Demografia",
  },
  {
    id: "q23",
    question: "Em qual ano a taxa de emprego informal atingiu seu valor mais alto na série?",
    options: ["2015", "2019", "2021", "2024"],
    correctIndex: 1,
    category: "Emprego",
  },
  {
    id: "q24",
    question: "A taxa de pobreza entre idosos (65+) em 2024 é de:",
    options: ["14,2%", "11,7%", "9,3%", "9,8%"],
    correctIndex: 2,
    category: "Pobreza",
  },
  {
    id: "q25",
    question: "Qual é a proporção de domicílios com habitação adequada em 2024?",
    options: ["70,8%", "74,2%", "77,5%", "80,1%"],
    correctIndex: 2,
    category: "Habitação",
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/** Format a number as Brazilian currency (R$) */
export function formatCurrency(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

/** Format a number as percentage with 1 decimal place */
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

/** Format Gini index with 3 decimal places */
export function formatGini(value: number): string {
  return value.toFixed(3);
}

/** Get latest value from a YearValuePair series */
export function getLatestValue(data: YearValuePair[]): number {
  return data[data.length - 1]?.value ?? 0;
}

/** Get value for a specific year from a YearValuePair series */
export function getValueForYear(data: YearValuePair[], year: number): number | null {
  const entry = data.find((d) => d.year === year);
  return entry ? entry.value : null;
}

/** Calculate the change between the first and last values in a series */
export function getTotalChange(data: YearValuePair[]): number {
  if (data.length < 2) return 0;
  return data[data.length - 1].value - data[0].value;
}

/** Calculate the percentage point change between first and last values */
export function getPercentagePointChange(data: YearValuePair[]): number {
  return getTotalChange(data);
}

/** Get the year with the maximum value in a series */
export function getYearWithMaxValue(data: YearValuePair[]): { year: number; value: number } {
  const maxEntry = data.reduce((prev, curr) => (curr.value > prev.value ? curr : prev), data[0]);
  return maxEntry;
}

/** Get the year with the minimum value in a series */
export function getYearWithMinValue(data: YearValuePair[]): { year: number; value: number } {
  const minEntry = data.reduce((prev, curr) => (curr.value < prev.value ? curr : prev), data[0]);
  return minEntry;
}

/** Get a random subset of quiz questions */
export function getRandomQuizQuestions(count: number): QuizQuestion[] {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/** Get quiz questions by category */
export function getQuizQuestionsByCategory(category: string): QuizQuestion[] {
  return quizQuestions.filter((q) => q.category === category);
}

/** Get all unique quiz categories */
export function getQuizCategories(): string[] {
  return Array.from(new Set(quizQuestions.map((q) => q.category)));
}

/** Get a random curiosity */
export function getRandomCuriosity(): Curiosidade {
  return curiosidades[Math.floor(Math.random() * curiosidades.length)];
}

/** Get curiosities by category */
export function getCuriositiesByCategory(category: string): Curiosidade[] {
  return curiosidades.filter((c) => c.category === category);
}

/** Get all unique curiosity categories */
export function getCuriosityCategories(): string[] {
  return Array.from(new Set(curiosidades.map((c) => c.category)));
}

/** Calculate the number of people in poverty based on rate and population */
export function calculatePeopleInPoverty(
  povertyRateValue: number,
  populationMillions: number
): number {
  return Math.round((povertyRateValue / 100) * populationMillions);
}
