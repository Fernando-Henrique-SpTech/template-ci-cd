# Exercício de Testes Unitários

## Objetivo

Este exercício tem como objetivo consolidar conhecimentos sobre testes unitários. Ele está dividido em duas partes principais:

## Parte 1: Fazer todos os testes funcionarem

Nesta primeira etapa, você deve:

1. **Executar os testes** para identificar quais estão falhando
2. **Analisar os erros** retornados pelos testes
3. **Implementar ou corrigir a lógica** do código para que todos os testes passem
4. **Corrigir erros de tipagem** que estão acontecendo no componente, aproveitando os tipos já criados no arquivo `types.ts`, e criando novos tipos quando necessário
5. **Validar** que todos os testes executam com sucesso

**Objetivo alcançado quando:** Todos os testes passarem sem erros.

## Parte 2: Alcançar 100% de cobertura de testes

Nesta segunda etapa, você deve:

1. **Gerar relatório de cobertura** de testes para identificar quais linhas não estão sendo testadas

```bash
npm test -- --coverage
```

2. **Analisar o código** e identificar cenários não cobertos
3. **Escrever testes adicionais** para cobrir:
   - Casos de sucesso não testados
   - Branches e condicionais não exercitados
4. **Verificar a cobertura** até atingir 100%

**Objetivo alcançado quando:** A cobertura de testes atingir 100% em todas as métricas (linhas, branches, funções).

