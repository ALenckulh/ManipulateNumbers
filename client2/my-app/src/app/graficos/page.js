"use client";
import React from "react";
import Plot from "react-plotly.js";
import { Line, Bar, Scatter } from "@ant-design/plots";

export default function Graficos() {
  const data = [
    { year: "Tempo 1", value: 0.02200484275817871 },
    { year: "Tempo 2", value: 0.019003868103027344 },
    { year: "Tempo 3", value: 0.019004344940185547 },
    { year: "Tempo 4", value: 0.020003795623779297 },
    { year: "Tempo 5", value: 0.018004417419433594 },
    { year: "Tempo 6", value: 0.019003629684448242 },
    { year: "Tempo 7", value: 0.025005340576171875 },
    { year: "Tempo 8", value: 0.01900458335876465 },
    { year: "Tempo 9", value: 0.021004676818847656 },
    { year: "Tempo 10", value: 0.02199721336364746 },
    { year: "Tempo 11", value: 0.020004987716674805 },
    { year: "Tempo 12", value: 0.01900458335876465 },
    { year: "Tempo 13", value: 0.03300786018371582 },
    { year: "Tempo 14", value: 0.02400517463684082 },
    { year: "Tempo 15", value: 0.020004749298095703 },
    { year: "Tempo 16", value: 0.022002696990966797 },
    { year: "Tempo 17", value: 0.018004179000854492 },
    { year: "Tempo 18", value: 0.01883101463317871 },
    { year: "Tempo 19", value: 0.023005008697509766 },
    { year: "Tempo 20", value: 0.021004676818847656 },
  ];

  const config = {
    data,
    xField: "year",
    yField: "value",
    height: 400,
    padding: "auto",
    autoFit: true,
    color: '#1890ff', // Cor da linha
    lineStyle: {
      lineWidth: 2, // Largura da linha
    },
    yAxis: {
      title: {
        text: 'Valor',
      },
    },
    xAxis: {
      title: {
        text: 'Tempo',
      },
    },
    meta: {
      year: { alias: 'Tempo' },
      value: { alias: 'Valor' },
    },
  };

  const x1 = [4, 6, 12, 13];
  const y1 = [8, 12, 24, 26];
  const sizes1 = [11, 22, 33, 34];

  const x2 = [2, 5, 6, 8];
  const y2 = [9, 12, 13, 14,];
  const sizes2 = [24, 32, 45, 54, 62];

  const dataPlotly = [
    {
      x: x1,
      y: y1,
      mode: "markers",
      marker: {
        size: sizes1,
        color: 'rgba(255, 0, 0, 0.6)', // Cor dos marcadores
        symbol: 'circle', // Símbolo dos marcadores
      },
    },
  ];

  const dataBubblePlotly = [
    {
      x: x2,
      y: y2,
      mode: "markers",
      marker: {
        size: sizes2.map(size => size * 2), // Ajustando os tamanhos dos marcadores
        color: 'rgba(0, 0, 255, 0.6)', // Cor dos marcadores
        symbol: 'circle', // Símbolo dos marcadores
      },
    },
  ];

  const layout = {
    title: "Gráficos",
    xaxis: { title: "Eixo X" },
    yaxis: { title: "Eixo Y" },
  };

  return (
    <div className="flex flex-col gap-16 p-20 bg-slate-200">
      <div className="flex flex-col gap-8">
        <h1>Gráfico de Linha</h1>
        <Line {...config} />
      </div>
      <div className="flex flex-col gap-8">
        <h1>Gráfico de Barras</h1>
        <Bar {...config} />
      </div>
      <div className="flex flex-col gap-8">
        <h1>Gráfico de Dispersão</h1>
        <Scatter {...config} />
      </div>
      <div className="flex flex-row justify-center gap-8">
        <div>
          <h1>Gráfico de Pontos</h1>
          <Plot data={dataPlotly} layout={layout} />
        </div>
        <div>
          <h1>Gráfico de Bolhas</h1>
          <Plot data={dataBubblePlotly} layout={layout} />
        </div>
      </div>
    </div>
  );
}
