import React from 'react';
import Plot from 'react-plotly.js';

export default function BubbleChart () {
  const x = [1, 2, 3, 4];
  const y = [10, 11, 12, 13];
  const sizes = [20, 30, 40, 50];

  const data = [{
    x: x,
    y: y,
    mode: 'markers',
    marker: {
      size: sizes,
    }
  }];

  const layout = {
    title: 'Gráfico de Bolhas',
    xaxis: { title: 'Eixo X' },
    yaxis: { title: 'Eixo Y' }
  };

  return (
    <Plot
      data={data}
      layout={layout}
    />
  );
}
